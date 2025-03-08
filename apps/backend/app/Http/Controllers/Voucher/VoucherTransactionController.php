<?php

namespace App\Http\Controllers\Voucher;

use App\Enums\TransactionType;
use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\ManagementShare;
use App\Models\Transaction;
use App\Models\VoucherTransaction;
use App\Models\VoucherType;
use App\Observers\VoucherTransactionObserver;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rules\Enum;

class VoucherTransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transactions = VoucherTransaction::with('account', 'voucherType')->orderBy('date_transaction', 'desc')->orderBy('id', 'desc')->paginate(10);

        return ApiResponse::success($transactions);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request)
    // {
    //     // Validasi input
    //     $request->validate([
    //         'account_id' => 'required|exists:accounts,id',
    //         'voucher_type_id' => 'required|exists:voucher_types,id',
    //         'transaction_type' => 'required|in:In,Out,Sold',
    //         'quantity' => 'required|integer|min:1',
    //         'date_transaction' => 'required|date',
    //     ]);

    //     // Ambil data dari tabel voucher_type
    //     $voucherType = VoucherType::findOrFail($request->voucher_type_id);

    //     // Simpan data ke dalam database
    //     $transaction = VoucherTransaction::create([
    //         'account_id' => $request->account_id,
    //         'voucher_type_id' => $request->voucher_type_id,
    //         'transaction_type' => $request->transaction_type,
    //         'quantity' => $request->quantity,
    //         'price_at_transaction' => $voucherType->base_price,
    //         'management_fee_at_transaction' => $voucherType->management_fee,
    //         'agent_commission_at_transaction' => $voucherType->agent_commission,
    //         'date_transaction' => $request->date_transaction,
    //     ]);

    //     return response()->json([
    //         'message' => 'Transaction created successfully',
    //         'data' => $transaction
    //     ], 201);
    // }

    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'account_id' => 'required|exists:accounts,id',
    //         'voucher_type_id' => 'required|exists:voucher_types,id',
    //         'transaction_type' => 'required|in:in,out,sold',
    //         'quantity' => 'required|integer|min:1',
    //         'date_transaction' => 'required|date',
    //     ]);

    //     return DB::transaction(function () use ($request) {
    //         // Ambil data voucher_type
    //         $voucherType = VoucherType::findOrFail($request->voucher_type_id);

    //         // Simpan transaksi utama
    //         $transaction = VoucherTransaction::create([
    //             'account_id' => $request->account_id,
    //             'voucher_type_id' => $request->voucher_type_id,
    //             'transaction_type' => $request->transaction_type,
    //             'quantity' => $request->quantity,
    //             'price_at_transaction' => $voucherType->base_price,
    //             'management_fee_at_transaction' => $voucherType->management_fee,
    //             'agent_commission_at_transaction' => $voucherType->agent_commission,
    //             'date_transaction' => $request->date_transaction,
    //         ]);

    //         // Jika jenis transaksi adalah 'Sold', proses pembagian hasil
    //         if ($request->transaction_type === TransactionType::SOLD) {
    //             $totalAmount = $request->quantity * $voucherType->base_price;
    //             $managementAmount = $request->quantity * $voucherType->management_fee;
    //             $agentAmount = $request->quantity * $voucherType->agent_commission;

    //             // 1. Update balance Vendor
    //             $vendorAccount = Account::where('role', 'vendor')->firstOrFail();
    //             $vendorAccount->increment('balance', $totalAmount);

    //             Transaction::create([
    //                 'account_id' => $vendorAccount->id,
    //                 'amount' => $totalAmount,
    //                 'transaction_category_id' => 2,
    //                 'transaction_type' => 'In',
    //                 'description' => 'Pendapatan dari penjualan voucher',
    //                 'transaction_date' => $transaction->date_transaction,
    //             ]);

    //             // 2. Update balance Management (berdasarkan persentase)
    //             $managementShares = ManagementShare::all(); // Ambil semua pembagian
    //             foreach ($managementShares as $share) {
    //                 $managementShareAmount = ($managementAmount * $share->percentage) / 100;

    //                 $share->account->increment('balance', $managementShareAmount);

    //                 Transaction::create([
    //                     'account_id' => $share->account_id,
    //                     'amount' => $managementShareAmount,
    //                     'transaction_category_id' => 4,
    //                     'transaction_type' => 'In',
    //                     'description' => "Fee manajemen ({$share->percentage}%) dari penjualan voucher",
    //                     'transaction_date' => $transaction->date_transaction,
    //                 ]);
    //             }

    //             // 3. Update balance Agen (account_id dari request)
    //             $agentAccount = Account::findOrFail($request->account_id);
    //             $agentAccount->increment('balance', $agentAmount);

    //             Transaction::create([
    //                 'account_id' => $agentAccount->id,
    //                 'transaction_category_id' => 3,
    //                 'description' => 'Komisi agen dari penjualan voucher',
    //                 'transaction_type' => 'In',
    //                 'amount' => $agentAmount,
    //                 'transaction_date' => $transaction->date_transaction,
    //             ]);
    //         }

    //         return response()->json([
    //             'message' => 'Transaction created successfully',
    //             'data' => $transaction
    //         ], 201);
    //     });
    // }

    public function store(Request $request)
    {
        $request->validate([
            'account_id' => 'required|exists:accounts,id',
            'voucher_type_id' => 'required|exists:voucher_types,id',
            'transaction_type' => ['required', new Enum(TransactionType::class)],
            'quantity' => 'required|integer|min:1',
            'date_transaction' => 'required|date',
        ]);

        return DB::transaction(function () use ($request) {
            $voucherType = VoucherType::findOrFail($request->voucher_type_id);

            $transaction = VoucherTransaction::create([
                'account_id' => $request->account_id,
                'voucher_type_id' => $request->voucher_type_id,
                'transaction_type' => $request->transaction_type,
                'quantity' => $request->quantity,
                'price_at_transaction' => $voucherType->base_price,
                'management_fee_at_transaction' => $voucherType->management_fee,
                'agent_commission_at_transaction' => $voucherType->agent_commission,
                'date_transaction' => $request->date_transaction,
            ]);

            return response()->json([
                'message' => 'Transaction created successfully',
                'data' => $transaction,
            ], 201);
        });
    }


    /**
     * Display the specified resource.
     */
    public function show(VoucherTransaction $voucherTransaction)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(VoucherTransaction $voucherTransaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, VoucherTransaction $voucherTransaction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(VoucherTransaction $voucherTransaction)
    {
        //
    }
}
