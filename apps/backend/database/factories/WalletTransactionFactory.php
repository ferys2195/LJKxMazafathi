<?php

namespace Database\Factories;

use App\Models\WalletTransaction;
use App\Models\Wallet;
use Illuminate\Database\Eloquent\Factories\Factory;

class WalletTransactionFactory extends Factory
{
    protected $model = WalletTransaction::class;

    public function definition(): array
    {
        return [
            'wallet_id' => Wallet::factory(),
            'type' => $this->faker->randomElement(['in', 'out']),
            'amount' => $this->faker->randomFloat(2, 10, 1000),
            'description' => $this->faker->sentence,
            'transaction_date' => $this->faker->date(),
        ];
    }
}
