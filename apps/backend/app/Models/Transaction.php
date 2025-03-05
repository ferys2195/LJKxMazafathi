<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected  $fillable = [
        "account_id",
        "transaction_category_id",
        "description",
        "transaction_type",
        "amount",
        "transaction_date"
    ];
    public function account()
    {
        return $this->belongsTo(Account::class);
    }
    public function transactionCategory()
    {
        return $this->belongsTo(TransactionCategory::class);
    }
}
