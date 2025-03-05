<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\VoucherTransaction;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $this->call([
            VoucherTypeSeeder::class,
            AccountSeeder::class,
            ManagementShareSeeder::class,
            TransactionCategorySeeder::class
            // WalletSeeder::class
            // TransactionSeeder::class,
            // VoucherTransactionSeeder::class
        ]);
    }
}
