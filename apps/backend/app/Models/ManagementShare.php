<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ManagementShare extends Model
{
    public function account()
    {
        return $this->belongsTo(Account::class);
    }
}
