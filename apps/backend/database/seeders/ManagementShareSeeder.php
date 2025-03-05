<?php

namespace Database\Seeders;

use App\Models\ManagementShare;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ManagementShareSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $percentages = [
            ['account_id' => 5, 'percentage' => 10],
            ['account_id' => 6, 'percentage' => 50],
            ['account_id' => 7, 'percentage' => 40],
        ];

        foreach ($percentages as $percentage) {
            ManagementShare::create($percentage);
        }
    }
}
