<?php

namespace App\Observers;

use App\Models\Account;
use App\Models\VoucherTransaction;
use App\Models\VoucherBalance;
use Illuminate\Support\Facades\Log;

class VoucherTransactionObserver
{
    /**
     * Handle the VoucherTransaction "created" event.
     */
    public function created(VoucherTransaction $transaction)
    {

        // Cek atau buat saldo voucher
        $voucherBalance = VoucherBalance::firstOrCreate([
            'account_id' => $transaction->account_id,
            'voucher_type_id' => $transaction->voucher_type_id,
        ], [
            'balance' => 0, // Jika tidak ada, buat dengan saldo awal 0
        ]);

        $getManagementId = Account::whereRole('agent')->whereIsManagement(1)->first();


        // Update saldo berdasarkan jenis transaksi
        if ($transaction->transaction_type === 'In') {
            $voucherBalance->increment('balance', $transaction->quantity);
        } elseif ($transaction->transaction_type === 'Out') {
            // Kurangi saldo admin/vendor utama
            VoucherBalance::where('account_id', $getManagementId->id) // 1 = ID vendor utama
                ->where('voucher_type_id', $transaction->voucher_type_id)
                ->decrement('balance', $transaction->quantity);

            // Tambah saldo agen
            $voucherBalance->increment('balance', $transaction->quantity);
        } elseif ($transaction->transaction_type === 'Sold') {
            $voucherBalance->decrement('balance', $transaction->quantity);
        }
    }
}
