<?php

namespace Database\Seeders;

use App\Models\Account;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $accounts = [
            ['name' => 'LJK', 'role' => 'vendor', 'is_management' => false],
            ['name' => 'Dayah', 'role' => 'agent', 'is_management' => false],
            ['name' => 'Enor', 'role' => 'agent', 'is_management' => false],
            ['name' => 'Rady', 'role' => 'agent', 'is_management' => false],
            ['name' => 'Managament', 'role' => 'agent', 'is_management' => true], // Manajemen menjual tanpa komisi agen
            ['name' => 'Fery', 'role' => 'management', 'is_management' => true],
            ['name' => 'Randy', 'role' => 'management', 'is_management' => true],
        ];

        foreach ($accounts as $account) {
            Account::create($account);
        }
    }
}
