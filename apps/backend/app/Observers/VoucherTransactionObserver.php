<?php

namespace App\Observers;

use App\Enums\TransactionType;
use App\Models\Account;
use App\Models\ManagementShare;
use App\Models\Transaction;
use App\Models\VoucherTransaction;
use App\Models\VoucherBalance;
use App\Models\VoucherType;
use Illuminate\Support\Facades\Log;


class VoucherTransactionObserver
{
    public function created(VoucherTransaction $transaction)
    {
        $voucherBalance = VoucherBalance::firstOrCreate([
            'account_id' => $transaction->account_id,
            'voucher_type_id' => $transaction->voucher_type_id,
        ], ['balance' => 0]);

        $getManagementId = Account::whereRole('agent')->whereIsManagement(1)->first();

        if ($transaction->transaction_type === TransactionType::IN->value) {
            $voucherBalance->increment('balance', $transaction->quantity);
        } elseif ($transaction->transaction_type === TransactionType::OUT->value) {
            VoucherBalance::where('account_id', $getManagementId->id)
                ->where('voucher_type_id', $transaction->voucher_type_id)
                ->decrement('balance', $transaction->quantity);

            $voucherBalance->increment('balance', $transaction->quantity);
        } elseif ($transaction->transaction_type === TransactionType::SOLD->value) {
            $voucherBalance->decrement('balance', $transaction->quantity);
            $this->handleSoldTransaction($transaction);
        }
    }

    private function handleSoldTransaction(VoucherTransaction $transaction)
    {
        $voucherType = $transaction->voucherType; // Ambil voucher type dari relasi
        $agentAccount = $transaction->account; // Ambil account dari relasi

        $totalAmount = $transaction->quantity * $voucherType->base_price;
        $managementAmount = $transaction->quantity * $voucherType->management_fee;
        $agentAmount = $transaction->quantity * $voucherType->agent_commission;

        // 1. Update balance Vendor
        $vendorAccount = Account::where('role', 'vendor')->firstOrFail();
        $vendorAccount->increment('balance', $totalAmount);
        $this->createTransaction(
            $vendorAccount->id,
            $totalAmount,
            2,
            "Pendapatan dari penjualan voucher {$voucherType->name} oleh {$agentAccount->name}",
            $transaction->date_transaction
        );

        // 2. Update balance Management
        $managementShares = ManagementShare::all();
        foreach ($managementShares as $share) {
            $managementShareAmount = ($managementAmount * $share->percentage) / 100;
            $share->account->increment('balance', $managementShareAmount);

            $this->createTransaction(
                $share->account_id,
                $managementShareAmount,
                4,
                "Fee manajemen ({$share->percentage}%) dari voucher {$voucherType->name} yang dijual oleh {$agentAccount->name}",
                $transaction->date_transaction
            );
        }

        // 3. Update balance Agen
        $agentAccount->increment('balance', $agentAmount);
        $this->createTransaction(
            $agentAccount->id,
            $agentAmount,
            3,
            "Komisi agen {$agentAccount->name} dari penjualan voucher {$voucherType->name}",
            $transaction->date_transaction
        );
    }

    private function createTransaction($accountId, $amount, $categoryId, $description, $date)
    {
        Transaction::create([
            'account_id' => $accountId,
            'amount' => $amount,
            'transaction_category_id' => $categoryId,
            'transaction_type' => 'In',
            'description' => $description,
            'transaction_date' => $date,
        ]);
    }


    /*

    // versi 2

    public function created(VoucherTransaction $transaction)
    {
        $this->updateVoucherBalance($transaction);
    }

    public function updated(VoucherTransaction $transaction)
    {
        if ($transaction->wasChanged(['voucher_type_id', 'quantity'])) {
            $this->rollbackVoucherBalance($transaction);
            $this->updateVoucherBalance($transaction);
        }
    }

    public function deleted(VoucherTransaction $transaction)
    {
        $this->rollbackVoucherBalance($transaction);
    }

    // Mengembalikan saldo ke kondisi sebelum perubahan atau penghapusan.
    private function rollbackVoucherBalance(VoucherTransaction $transaction)
    {
        $voucherTypeId = $transaction->voucher_type_id;
        $quantity = $transaction->quantity;
        $transactionType = $transaction->transaction_type;
        $accountId = $transaction->account_id;

        // Ambil akun management
        $managementAccount = Account::whereRole('agent')->whereIsManagement(1)->first();

        if ($transactionType === TransactionType::IN->value) {
            VoucherBalance::where('account_id', $accountId)
                ->where('voucher_type_id', $voucherTypeId)
                ->decrement('balance', $quantity);
        } elseif ($transactionType === TransactionType::OUT->value) {
            // Kembalikan ke management
            VoucherBalance::where('account_id', $managementAccount->id)
                ->where('voucher_type_id', $voucherTypeId)
                ->increment('balance', $quantity);

            // Kurangi dari agen
            VoucherBalance::where('account_id', $accountId)
                ->where('voucher_type_id', $voucherTypeId)
                ->decrement('balance', $quantity);
        } elseif ($transactionType === TransactionType::SOLD->value) {
            // Kembalikan ke voucher
            VoucherBalance::where('account_id', $accountId)
                ->where('voucher_type_id', $voucherTypeId)
                ->increment('balance', $quantity);

            $this->rollbackSoldTransaction($transaction);
        }
    }

    // Update saldo berdasarkan transaksi baru atau perubahan.
    private function updateVoucherBalance(VoucherTransaction $transaction)
    {
        $voucherBalance = VoucherBalance::firstOrCreate([
            'account_id' => $transaction->account_id,
            'voucher_type_id' => $transaction->voucher_type_id,
        ], ['balance' => 0]);

        $managementAccount = Account::whereRole('agent')->whereIsManagement(1)->first();

        if ($transaction->transaction_type === TransactionType::IN->value) {
            $voucherBalance->increment('balance', $transaction->quantity);
        } elseif ($transaction->transaction_type === TransactionType::OUT->value) {
            VoucherBalance::where('account_id', $managementAccount->id)
                ->where('voucher_type_id', $transaction->voucher_type_id)
                ->decrement('balance', $transaction->quantity);

            $voucherBalance->increment('balance', $transaction->quantity);
        } elseif ($transaction->transaction_type === TransactionType::SOLD->value) {
            $voucherBalance->decrement('balance', $transaction->quantity);
            $this->handleSoldTransaction($transaction);
        }
    }

    // Rollback transaksi SOLD (Mengembalikan saldo Vendor, Management, dan Agen).
    private function rollbackSoldTransaction(VoucherTransaction $transaction)
    {
        $voucherType = VoucherType::findOrFail($transaction->voucher_type_id);
        $quantity = $transaction->quantity;

        $totalAmount = $quantity * $voucherType->base_price;
        $managementAmount = $quantity * $voucherType->management_fee;
        $agentAmount = $quantity * $voucherType->agent_commission;

        // 1. Kembalikan saldo Vendor
        $vendorAccount = Account::where('role', 'vendor')->firstOrFail();
        $vendorAccount->decrement('balance', $totalAmount);

        // 2. Kembalikan saldo Management
        $managementShares = ManagementShare::all();
        foreach ($managementShares as $share) {
            $managementShareAmount = ($managementAmount * $share->percentage) / 100;
            $share->account->decrement('balance', $managementShareAmount);
        }

        // 3. Kembalikan saldo Agen
        $agentAccount = Account::findOrFail($transaction->account_id);
        $agentAccount->decrement('balance', $agentAmount);
    }


    //Proses transaksi SOLD (Menambah saldo Vendor, Management, dan Agen).

    private function handleSoldTransaction(VoucherTransaction $transaction)
    {
        $voucherType = VoucherType::findOrFail($transaction->voucher_type_id);
        $quantity = $transaction->quantity;

        $totalAmount = $quantity * $voucherType->base_price;
        $managementAmount = $quantity * $voucherType->management_fee;
        $agentAmount = $quantity * $voucherType->agent_commission;

        // 1. Update balance Vendor
        $vendorAccount = Account::where('role', 'vendor')->firstOrFail();
        $vendorAccount->increment('balance', $totalAmount);

        // 2. Update balance Management
        $managementShares = ManagementShare::all();
        foreach ($managementShares as $share) {
            $managementShareAmount = ($managementAmount * $share->percentage) / 100;
            $share->account->increment('balance', $managementShareAmount);
        }

        // 3. Update balance Agen
        $agentAccount = Account::findOrFail($transaction->account_id);
        $agentAccount->increment('balance', $agentAmount);
    }
    */
}
