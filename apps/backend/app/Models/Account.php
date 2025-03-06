<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    //
    protected $fillable = [""];

    public function voucherTransaction()
    {
        return $this->hasMany(VoucherTransaction::class);
    }
    public function voucherBalance()
    {
        return $this->hasMany(VoucherBalance::class);
    }
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
    public function managementShare()
    {
        return $this->hasOne(ManagementShare::class);
    }
}
