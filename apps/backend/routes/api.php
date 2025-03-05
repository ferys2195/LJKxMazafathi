<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\AgentSalesController;
use App\Http\Controllers\RecapSalesController;
use App\Http\Controllers\TransactionCategoryController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\TransactionSummaryController;
use App\Http\Controllers\Voucher\VoucherAgenController;
use App\Http\Controllers\VoucherTransactionController;
use App\Http\Controllers\VoucherTypeController;
use App\Http\Controllers\WalletController;
use App\Http\Controllers\WalletTransactionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::prefix('voucher-balances')->group(function () {
    Route::get('/', [VoucherTypeController::class, 'getBalanceByVoucherType']);
    Route::get('/{accountId}', [VoucherTypeController::class, 'getBalanceByVoucherType']);
});
Route::get('/agent-sales', AgentSalesController::class);
Route::get('/recap-sales', RecapSalesController::class);
Route::resource('vouchers', VoucherTypeController::class);
Route::get('/transactions/pivot', [TransactionController::class, 'pivot']);
Route::get('/transactions/summary', TransactionSummaryController::class);
Route::resource('transactions', TransactionController::class);
Route::get('transaction-categories', TransactionCategoryController::class);
Route::resource('accounts', AccountController::class);
Route::resource('voucher-transaction', VoucherTransactionController::class);
Route::get('voucher-agents', VoucherAgenController::class);

Route::resource('wallets', WalletController::class);
Route::resource('wallet-transactions', WalletTransactionController::class);
