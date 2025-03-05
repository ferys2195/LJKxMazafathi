<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Account;
use App\Models\VoucherType;
use Illuminate\Http\Request;

class AgentSalesController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        // buat query untuk memfilter transaksi sold
        // $agents = Account::whereRole('agent')->whereIsManagement(false)
        //     ->with([
        //         'voucherBalance' => function ($query) {
        //             $query->select('account_id', 'voucher_type_id', 'balance');
        //         },
        //         'voucherTransaction' => function ($query) {
        //             $query->select('account_id', 'voucher_type_id');
        //         }
        //     ])
        //     ->get()
        //     ->map(function ($agent) {
        //         $voucherTypes = VoucherType::with('voucherTransaction')
        //             ->pluck('name', 'id');

        //         $totalSales = $agent->voucherTransaction->sum(function ($transaction) {
        //             return optional($transaction->voucherType)->agent_comission ?? 0;
        //         });

        //         return [
        //             'id' => $agent->id,
        //             'name' => $agent->name,
        //             'total_sales' => $totalSales,
        //             'balances' => $voucherTypes->map(function ($name, $id) use ($agent) {
        //                 $balance = optional($agent->voucherBalance)->firstWhere('voucher_type_id', $id);
        //                 return [
        //                     'voucher_type' => $name,
        //                     'quantity' => $balance ? $balance->balance : 0
        //                 ];
        //             })->values()
        //         ];
        //     });



        // $agents = Account::whereRole('agent')->whereIsManagement(false)->with('voucherTransaction.voucherType')->get();
        // return ApiResponse::success($agents, 'Get All data');

        // v3
        // $agents = Account::whereRole('agent')->whereIsManagement(false)
        //     ->with(['voucherTransaction' => function ($query) {
        //         $query->where('transaction_type', 'sold');
        //     }, 'voucherTransaction.voucherType'])
        //     ->get()
        //     ->map(function ($agent) {
        //         $voucherTypes = VoucherType::pluck('name', 'id');

        //         $totalSales = $agent->voucherTransaction->sum(function ($transaction) {
        //             return $transaction->quantity * $transaction->agent_commission_at_transaction;
        //         });

        //         return [
        //             'id' => $agent->id,
        //             'name' => $agent->name,
        //             'total_sales' => $totalSales,
        //             'sales_details' => $voucherTypes->map(function ($name, $id) use ($agent) {
        //                 $quantity = $agent->voucherTransaction->where('voucher_type_id', $id)->sum('quantity');
        //                 return [
        //                     'voucher_type' => $name,
        //                     'quantity' => $quantity ?: 0
        //                 ];
        //             })->values()
        //         ];
        //     });

        // return ApiResponse::success($agents, 'Get All data');

        // Ambil data agen dengan transaksi dan jumlah komisi
        $agents = Account::whereRole('agent')->whereIsManagement(false)
            ->with(['voucherTransaction' => function ($query) {
                $query->select('account_id', 'voucher_type_id', 'quantity', 'agent_commission_at_transaction')
                    ->where('transaction_type', 'sold');
            }])
            ->get();

        // Ambil semua jenis voucher sekali saja
        $voucherTypes = VoucherType::whereIsActive(true)->pluck('name', 'id');

        $result = $agents->map(function ($agent) use ($voucherTypes) {
            // Hitung total komisi langsung dari transaksi
            $totalSales = $agent->voucherTransaction->sum(
                fn($transaction) =>
                $transaction->quantity * $transaction->agent_commission_at_transaction
            );

            // Hitung jumlah voucher yang terjual
            $salesDetails = $voucherTypes->map(function ($name, $id) use ($agent) {
                $quantity = $agent->voucherTransaction
                    ->where('voucher_type_id', $id)
                    ->sum('quantity');

                return [
                    'voucher_type' => $name,
                    'quantity' => $quantity ?: 0
                ];
            })->values();

            return [
                'id' => $agent->id,
                'name' => $agent->name,
                'total_sales' => $totalSales,
                'sales_details' => $salesDetails,
            ];
        });

        return ApiResponse::success($result, 'Get All data');
    }
}
