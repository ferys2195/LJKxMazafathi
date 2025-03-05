<?php

namespace App\Http\Controllers\Voucher;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\VoucherType;
use Illuminate\Http\Request;

class VoucherAgenController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $agents = Account::whereRole('agent')->whereIsManagement(false) // Sesuaikan dengan role agen di sistem Anda
            ->with([
                'voucherBalance' => function ($query) {
                    $query->select('account_id', 'voucher_type_id', 'balance');
                }
            ])
            ->get()
            ->map(function ($agent) {
                // Ambil semua jenis voucher untuk memastikan semua voucher type ditampilkan
                $voucherTypes = VoucherType::pluck('name', 'id');

                // Format ulang data agar sesuai dengan yang diinginkan
                return [
                    'id' => $agent->id,
                    'name' => $agent->name,
                    'balances' => $voucherTypes->map(function ($name, $id) use ($agent) {
                        // Cari saldo agen untuk voucher type ini
                        $balance = optional($agent->voucherBalance)->firstWhere('voucher_type_id', $id);
                        return [
                            'voucher_type' => $name,
                            'quantity' => $balance ? $balance->balance : 0
                        ];
                    })->values() // Reset array index
                ];
            });

        return ApiResponse::success($agents, 'Get All data');
        // return $map;
    }
}
