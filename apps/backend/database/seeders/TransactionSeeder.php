<?php

namespace Database\Seeders;

use App\Models\Transaction;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $transactions = [
            [
                'account_id' => 1, // Dayah
                'description' => 'Penghasilan dari Dayah',
                'transaction_type' => 'in',
                'amount' => 282000,
                'transaction_date' => '2024-09-13',
            ],
            [
                'account_id' => 2, // Enor
                'description' => 'Penghasilan dari Enor',
                'transaction_type' => 'in',
                'amount' => 1081000,
                'transaction_date' => '2024-09-18',
            ],
            [
                'account_id' => 3, // Rady
                'description' => 'Penghasilan dari Rady',
                'transaction_type' => 'in',
                'amount' => 570000,
                'transaction_date' => '2024-09-19',
            ],
            [
                'account_id' => 4, // Kas
                'description' => 'Pendapatan Lainnya',
                'transaction_type' => 'in',
                'amount' => 156000,
                'transaction_date' => '2024-09-19',
            ],
            [
                'account_id' => 4, // Kas
                'description' => 'Biaya Transfer ke Rek. Bisnis',
                'transaction_type' => 'out',
                'amount' => 10000,
                'transaction_date' => '2024-09-19',
            ],
            [
                'account_id' => 5, // LJK
                'description' => 'Transfer ke Vendor',
                'transaction_type' => 'out',
                'amount' => 1735000,
                'transaction_date' => '2024-09-19',
            ],
            [
                'account_id' => 6, // Randy
                'description' => 'Penarikan Komisi',
                'transaction_type' => 'out',
                'amount' => 100000,
                'transaction_date' => '2024-10-01',
            ],
            [
                'account_id' => 3, // Rady
                'description' => 'Penghasilan dari Rady',
                'transaction_type' => 'in',
                'amount' => 756000,
                'transaction_date' => '2024-10-16',
            ],
            [
                'account_id' => 4, // Kas
                'description' => 'Biaya Transfer ke Rek. Bisnis',
                'transaction_type' => 'out',
                'amount' => 5000,
                'transaction_date' => '2024-10-16',
            ],
        ];

        foreach ($transactions as $transaction) {
            Transaction::create($transaction);
        }
    }
}
