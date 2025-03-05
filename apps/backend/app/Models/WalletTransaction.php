<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WalletTransaction extends Model
{
    use HasFactory;
    protected $fillable = ['wallet_id', 'type', 'amount', 'description', 'transaction_date'];

    public function wallet()
    {
        return $this->belongsTo(Wallet::class);
    }
}
