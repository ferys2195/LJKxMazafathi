<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\VoucherType;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VoucherTypeController extends Controller
{
    public function index()
    {
        $vouchers = VoucherType::whereIsActive(true)->get();
        return new JsonResponse($vouchers);
    }
    public function getBalanceByVoucherType($accountId = null)
    {
        $vouchers = VoucherType::withSum(['voucherBalance as voucher_balance_sum' => function ($query) use ($accountId) {
            if (!is_null($accountId)) {
                $query->where('account_id', $accountId);
            }
        }], 'balance')
            ->whereIsActive(true)
            ->get()
            ->map(function ($voucher) {
                return [
                    'name' => $voucher->name,
                    'balance' => (int) $voucher->voucher_balance_sum ?? 0
                ];
            });

        return ApiResponse::success($vouchers, 'Get All data');
    }
}
