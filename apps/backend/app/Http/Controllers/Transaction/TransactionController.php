<?php

namespace App\Http\Controllers\Transaction;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        try {
            $request->validate([
                'date_from' => 'required_with:date_to|date',
                'date_to' => 'required_with:date_from|date',
                'category' => 'nullable|exists:transaction_categories,id',
            ]);

            $transactions = Transaction::query()
                ->when($request->filled(['date_from', 'date_to']), function ($q) use ($request) {
                    $q->whereBetween('transaction_date', [$request->date_from, $request->date_to]);
                })
                ->when($request->filled('category'), function ($q) use ($request) {
                    $q->where('transaction_category_id', $request->category);
                })
                ->with('account', 'transactionCategory')->orderBy('transaction_date', 'desc')->orderBy('id', 'desc')->paginate(10);

            return ApiResponse::success($transactions);
        } catch (ValidationException $e) {
            return ApiResponse::error("Validation failed", $e->errors(), 422);
        }
    }
    function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'account_id' => 'required|exists:accounts,id',
                'transaction_category_id' => 'required|exists:transaction_categories,id',
                'description' => 'required|string|max:255',
                'transaction_type' => 'required|in:in,out',
                'amount' => 'required|integer|min:1', // Tidak boleh 0
                'transaction_date' => 'required|date', // Validasi format tanggal
            ]);

            $transaction = Transaction::create($validated);

            return ApiResponse::success($transaction, "Transaction Create Successfully", 201);
        } catch (ValidationException $e) {
            return response()->json([
                'errors' => $e->errors(),
                'message' => 'Validation failed',
            ], 422);
        }
    }

    public function pivot()
    {
        // Ambil total saldo tersisa
        $totalIn = Transaction::where('transaction_type', 'In')->sum('amount');
        $totalOut = Transaction::where('transaction_type', 'Out')->sum('amount');
        $saldoTersisa = $totalIn - $totalOut;

        // Query Pivot dengan Join ke Accounts
        $pivotData = Transaction::select(
            'accounts.name as account_name',
            DB::raw("SUM(CASE WHEN transactions.transaction_type = 'In' THEN transactions.amount ELSE 0 END) as total_in"),
            DB::raw("SUM(CASE WHEN transactions.transaction_type = 'Out' THEN transactions.amount ELSE 0 END) as total_out")
        )
            ->join('accounts', 'transactions.account_id', '=', 'accounts.id')
            ->groupBy('accounts.name')
            ->get();

        // Tambahkan total keseluruhan
        $grandTotal = [
            'account_name' => 'Grand Total',
            'total_in' => $totalIn,
            'total_out' => $totalOut
        ];

        return response()->json([
            'saldo_tersisa' => $saldoTersisa,
            'data' => $pivotData,
            'grand_total' => $grandTotal
        ]);
    }
}
