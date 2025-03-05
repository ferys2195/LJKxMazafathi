<?php

namespace Database\Factories;

use App\Models\Wallet;
use Illuminate\Database\Eloquent\Factories\Factory;

class WalletFactory extends Factory
{
    protected $model = Wallet::class;

    public function definition(): array
    {
        return [
            'account_id' => rand(1, 5), // Sesuaikan dengan id akun yang ada
            'name' => $this->faker->word . ' Wallet',
            'balance' => $this->faker->randomFloat(2, 100, 10000),
        ];
    }
}
