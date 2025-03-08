<?php

namespace App\Http\Controllers\Transaction;

use App\Enums\TransactionType;
use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;

class WithdrawController extends Controller
{
    public function __invoke(Request $request)
    {
        try {
            // Validasi hanya untuk account_id dan amount
            $validated = $request->validate([
                'account_id' => 'required|exists:accounts,id',
                'amount' => 'required|integer|min:1',
            ]);

            // Set nilai hardcode
            $validated['description'] = $validated['account_id'] == 1 ? 'Penarikan Penghasilan' : 'Penarikan Komisi';
            $validated['transaction_type'] = TransactionType::OUT->value;
            $validated['transaction_date'] = now()->toDateString();
            $validated['transaction_category_id'] = 6;

            // Simpan transaksi
            $transaction = DB::transaction(function () use ($validated) {
                // Simpan transaksi
                $transaction = Transaction::create($validated);

                // Kurangi saldo akun
                $balance = Account::findOrFail($validated['account_id']);
                $balance->decrement('balance', $validated['amount']);

                return $transaction; // Mengembalikan objek transaksi
            });

            return ApiResponse::success($transaction, "Transaction Create Successfully", 201);
        } catch (ValidationException $e) {
            return ApiResponse::error("Validation Failed", $e->errors(), 422);
        }
    }
}
