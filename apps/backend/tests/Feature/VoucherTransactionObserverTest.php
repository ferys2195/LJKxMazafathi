<?php

namespace Tests\Feature;

use App\Models\VoucherTransaction;
use App\Models\VoucherBalance;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class VoucherTransactionObserverTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_updates_balance_when_transaction_created()
    {
        // Jalankan hanya seeder yang dibutuhkan
        $this->seed();

        // Buat transaksi setelah seeder dijalankan
        $transaction = VoucherTransaction::create([
            'account_id' => 1, // Harus cocok dengan AccountSeeder
            'voucher_type_id' => 1, // Harus cocok dengan VoucherTypeSeeder
            'transaction_type' => 'in',
            'quantity' => 10,
            'price_at_transaction' => 1000,
            'management_fee_at_transaction' => 50,
            'agent_commission_at_transaction' => 100,
            'date_transaction' => now(),
        ]);

        // Pastikan saldo voucher diperbarui oleh observer
        $this->assertDatabaseHas('voucher_balances', [
            'account_id' => $transaction->account_id,
            'voucher_type_id' => $transaction->voucher_type_id,
            'balance' => 10,
        ]);
    }
}
