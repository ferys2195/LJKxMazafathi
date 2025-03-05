<?php

namespace App\Models;

use App\Observers\VoucherTransactionObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Model;

#[ObservedBy([VoucherTransactionObserver::class])]
class VoucherTransaction extends Model
{
    protected $fillable = [
        'account_id',
        'voucher_type_id',
        'transaction_type',
        'quantity',
        'price_at_transaction',
        'management_fee_at_transaction',
        'agent_commission_at_transaction',
        'date_transaction'
    ];
    public function account()
    {
        return $this->belongsTo(Account::class);
    }
    public function voucherType()
    {
        return $this->belongsTo(VoucherType::class);
    }
}
