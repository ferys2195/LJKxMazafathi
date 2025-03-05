<?php

namespace Database\Seeders;

use App\Models\Account;
use App\Models\Wallet;
use App\Models\WalletTransaction;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WalletSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Wallet::factory()
        //     ->count(5)
        //     // ->has(WalletTransaction::factory()->count(10))
        //     ->create();

        $accountIDs = [2, 3, 4, 6, 7];

        // Ambil data akun yang sesuai dengan ID
        $accounts = Account::whereIn('id', $accountIDs)->get();

        foreach ($accounts as $account) {
            Wallet::create([
                'account_id' => $account->id,
                'name' => $account->name,
                'balance' => 0, // Atur saldo awal, sesuaikan dengan kebutuhan
            ]);
        }
    }
}
