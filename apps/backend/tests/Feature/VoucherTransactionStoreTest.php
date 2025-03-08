<?php

namespace Tests\Feature;

use App\Enums\TransactionType;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class VoucherTransactionStoreTest extends TestCase
{
    use RefreshDatabase; // Membersihkan database setiap kali tes berjalan.

    protected function setUp(): void
    {
        parent::setUp();

        // Menjalankan semua seeder di DatabaseSeeder.php
        $this->seed();
    }

    #[Test]
    public function it_creates_a_voucher_transaction_successfully()
    {
        $response = $this->postJson('/api/voucher-transactions', [
            'account_id' => 1,
            'voucher_type_id' => 1,
            'transaction_type' => TransactionType::IN->value,
            'quantity' => 10,
            'date_transaction' => now()->format('Y-m-d'),
        ]);

        // Cek status response 201 (Created)
        $response->assertStatus(201)
            ->assertJson([
                'message' => 'Transaction created successfully',
            ]);

        // Verifikasi data tersimpan di database
        $this->assertDatabaseHas('voucher_transactions', [
            'account_id' => 1,
            'voucher_type_id' => 1,
            'transaction_type' => TransactionType::IN->value,
            'quantity' => 10,
        ]);
    }

    #[Test]
    public function it_fails_when_required_fields_are_missing()
    {
        $response = $this->postJson('/api/voucher-transactions', []);

        // Validasi harus gagal dengan status 422
        $response->assertStatus(422)
            ->assertJsonValidationErrors([
                'account_id',
                'voucher_type_id',
                'transaction_type',
                'quantity',
                'date_transaction',
            ]);
    }

    #[Test]
    public function it_fails_when_invalid_transaction_type_is_given()
    {
        $response = $this->postJson('/api/voucher-transactions', [
            'account_id' => 1,
            'voucher_type_id' => 1,
            'transaction_type' => 'invalid_type',
            'quantity' => 10,
            'date_transaction' => now()->format('Y-m-d'),
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['transaction_type']);
    }

    #[Test]
    public function it_handles_non_existing_account_or_voucher_type()
    {
        $response = $this->postJson('/api/voucher-transactions', [
            'account_id' => 999, // Tidak ada di database
            'voucher_type_id' => 999, // Tidak ada di database
            'transaction_type' => TransactionType::IN->value,
            'quantity' => 10,
            'date_transaction' => now()->format('Y-m-d'),
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['account_id', 'voucher_type_id']);
    }

    #[Test]
    public function it_fails_when_quantity_is_invalid()
    {
        $response = $this->postJson('/api/voucher-transactions', [
            'account_id' => 1,
            'voucher_type_id' => 1,
            'transaction_type' => TransactionType::IN->value,
            'quantity' => 0, // Invalid karena minimal 1
            'date_transaction' => now()->format('Y-m-d'),
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['quantity']);
    }
}
