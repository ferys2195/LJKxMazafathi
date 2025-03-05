<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\VoucherBalance;
use App\Models\VoucherTransaction;
use App\Models\VoucherType;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class RecapSalesController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        try {
            // v1
            // $request->validate([
            //     'date_from' => 'required|date',
            //     'date_to' => 'required|date|after_or_equal:date_from',
            // ]);

            // $dateFrom = $request->date_from;
            // $dateTo = $request->date_to;

            // $voucherTypes = VoucherType::where('is_active', true)->get();

            // $salesData = VoucherTransaction::where('transaction_type', 'sold')
            //     ->whereBetween('date_transaction', [$dateFrom, $dateTo])
            //     ->selectRaw('voucher_type_id, SUM(quantity) as total_sold')
            //     ->groupBy('voucher_type_id')
            //     ->get()
            //     ->pluck('total_sold', 'voucher_type_id');

            // $balances = VoucherBalance::selectRaw('voucher_type_id, SUM(balance) as total_balance')
            //     ->groupBy('voucher_type_id')
            //     ->get()
            //     ->pluck('total_balance', 'voucher_type_id');

            // $result = $voucherTypes->map(function ($voucher) use ($salesData, $balances) {
            //     $totalSold = (int) $salesData->get($voucher->id, 0);
            //     $basePrice = (int) $voucher->base_price;
            //     $totalBalance = (int) $balances->get($voucher->id, 0);

            //     return [
            //         'voucher_type' => $voucher->name,
            //         'base_price' => $basePrice,
            //         'total_sold' => $totalSold,
            //         'total_amount' => $basePrice * $totalSold,
            //         'remaining_balance' => $totalBalance,
            //     ];
            // });

            // return ApiResponse::success($result, 'Voucher sales recap retrieved successfully');


            // v2
            $request->validate([
                'year' => 'required|integer|min:2000|max:' . now()->year,
                'month' => 'required|integer|min:1|max:12',
            ]);

            $year = $request->year;
            $month = $request->month;

            // Ambil tanggal terakhir dari transaksi di bulan yang dipilih
            $dateTo = VoucherTransaction::whereYear('date_transaction', $year)
                ->whereMonth('date_transaction', $month)
                ->where('transaction_type', 'sold')
                ->max('date_transaction');

            if (!$dateTo) {
                return ApiResponse::success([], 'No sales data found for the selected month.');
            }

            // Ambil tanggal terakhir dari transaksi di bulan sebelumnya
            $previousMonth = Carbon::create($year, $month, 1)->subMonth();
            $dateFrom = VoucherTransaction::whereYear('date_transaction', $previousMonth->year)
                ->whereMonth('date_transaction', $previousMonth->month)
                ->where('transaction_type', 'sold')
                ->max('date_transaction');

            if (!$dateFrom) {
                $dateFrom = $previousMonth->startOfMonth()->toDateString();
            } else {
                $dateFrom = Carbon::parse($dateFrom)->addDay()->toDateString();
            }

            $voucherTypes = VoucherType::where('is_active', true)->get();

            $salesData = VoucherTransaction::where('transaction_type', 'sold')
                ->whereBetween('date_transaction', [$dateFrom, $dateTo])
                ->selectRaw('voucher_type_id, SUM(quantity) as total_sold')
                ->groupBy('voucher_type_id')
                ->get()
                ->pluck('total_sold', 'voucher_type_id');

            $balances = VoucherBalance::selectRaw('voucher_type_id, SUM(balance) as total_balance')
                ->groupBy('voucher_type_id')
                ->get()
                ->pluck('total_balance', 'voucher_type_id');

            $result = $voucherTypes->map(function ($voucher) use ($salesData, $balances) {
                $totalSold = (int) $salesData->get($voucher->id, 0);
                $basePrice = (int) $voucher->base_price;
                $totalBalance = (int) $balances->get($voucher->id, 0);

                return [
                    'voucher_type' => $voucher->name,
                    'base_price' => $basePrice,
                    'total_sold' => $totalSold,
                    'total_amount' => $basePrice * $totalSold,
                    'remaining_balance' => $totalBalance,
                ];
            });

            $period = [
                'date_from' => Carbon::parse($dateFrom)->format('d F Y'),
                'date_to' => Carbon::parse($dateTo)->format('d F Y')
            ];

            return ApiResponse::successWithInfo(['period' => $period], $result, 'Voucher sales recap retrieved successfully');
        } catch (ValidationException $e) {
            return ApiResponse::error("Please Select date and year !", $e->errors(), 422);
        }
    }
}
