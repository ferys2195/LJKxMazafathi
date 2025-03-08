<?php

namespace Database\Seeders;

use App\Models\TransactionCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TransactionCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = ['Penjualan', 'Pembayaran Vendor', 'Komisi Agen', 'Gaji Karyawan', 'Biaya Operasional', 'Tarik Tunai', 'Modal'];
        foreach ($categories as $category) {
            TransactionCategory::create(['name' => $category]);
        }
    }
}
