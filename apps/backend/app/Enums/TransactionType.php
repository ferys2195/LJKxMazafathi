<?php

namespace App\Enums;

enum TransactionType: string
{
    case IN = 'in';   // Disimpan di database
    case OUT = 'out'; // Disimpan di database
    case SOLD = 'sold'; // Disimpan di database

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
