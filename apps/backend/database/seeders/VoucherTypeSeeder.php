<?php

namespace Database\Seeders;

use App\Models\VoucherType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VoucherTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 🟢 Data Harga Lama
        /*
        VoucherType::create([
            'name' => '2 Jam',
            'base_price' => 5000,
            'management_fee' => 850,
            'agent_commission' => 150,
            'is_active' => true,
        ]);

        VoucherType::create([
            'name' => '3 Jam',
            'base_price' => 4000,
            'management_fee' => 1000,
            'agent_commission' => 1000,
            'is_active' => true,
        ]);

        VoucherType::create([
            'name' => '5 Jam',
            'base_price' => 10000,
            'management_fee' => 1700,
            'agent_commission' => 300,
            'is_active' => true,
        ]);

        VoucherType::create([
            'name' => '1 Hari',
            'base_price' => 20000,
            'management_fee' => 4250,
            'agent_commission' => 750,
            'is_active' => true,
        ]);

        VoucherType::create([
            'name' => '7 Hari',
            'base_price' => 70000,
            'management_fee' => 8500,
            'agent_commission' => 1500,
            'is_active' => true,
        ]);

        VoucherType::create([
            'name' => '30 Hari',
            'base_price' => 200000,
            'management_fee' => 12750,
            'agent_commission' => 2250,
            'is_active' => true,
        ]);
        */

        // 🟡 Data Harga Baru (Komentar, Aktifkan Nanti)

        VoucherType::create([
            'name' => '3 Jam',
            'base_price' => 4000,
            'management_fee' => 1000,
            'agent_commission' => 1000,
            'is_active' => true,
        ]);

        VoucherType::create([
            'name' => '5 Jam',
            'base_price' => 10000,
            'management_fee' => 1000,
            'agent_commission' => 1000,
            'is_active' => true,
        ]);

        VoucherType::create([
            'name' => '1 Hari',
            'base_price' => 20000,
            'management_fee' => 3000,
            'agent_commission' => 2000,
            'is_active' => true,
        ]);

        VoucherType::create([
            'name' => '7 Hari',
            'base_price' => 70000,
            'management_fee' => 6000,
            'agent_commission' => 4000,
            'is_active' => true,
        ]);

        VoucherType::create([
            'name' => '30 Hari',
            'base_price' => 200000,
            'management_fee' => 9000,
            'agent_commission' => 6000,
            'is_active' => true,
        ]);
    }
}
