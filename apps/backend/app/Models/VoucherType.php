<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VoucherType extends Model
{
    public function voucherTransaction()
    {
        return $this->hasMany(VoucherTransaction::class);
    }
    public function voucherBalance()
    {
        return $this->hasMany(VoucherBalance::class);
    }
}
