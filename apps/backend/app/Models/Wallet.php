<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    use HasFactory;
    protected $fillable = ['account_id', 'name', 'balance'];

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function transactions()
    {
        return $this->hasMany(WalletTransaction::class);
    }

    public function addTransaction($type, $amount, $description = null)
    {
        $this->transactions()->create([
            'type' => $type,
            'amount' => $amount,
            'description' => $description,
            'transaction_date' => now(),
        ]);

        $this->updateBalance($type, $amount);
    }

    protected function updateBalance($type, $amount)
    {
        if ($type === 'in') {
            $this->increment('balance', $amount);
        } elseif ($type === 'out') {
            $this->decrement('balance', $amount);
        }
    }
}
