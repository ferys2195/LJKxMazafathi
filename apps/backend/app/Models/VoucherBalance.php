<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VoucherBalance extends Model
{
    protected $fillable = [
        'account_id',
        'voucher_type_id',
        'balance'
    ];
}
