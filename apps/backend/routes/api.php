<?php

use App\Http\Controllers\AccountBalanceController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\AgentSalesController;
use App\Http\Controllers\RecapSalesController;
use App\Http\Controllers\Transaction\TransactionCategoryController;
use App\Http\Controllers\Transaction\TransactionController;
use App\Http\Controllers\Transaction\TransactionSummaryController;
use App\Http\Controllers\Voucher\VoucherAgenController;
use App\Http\Controllers\Voucher\VoucherTransactionController;
use App\Http\Controllers\Voucher\VoucherTypeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// ✅ Mendapatkan data user yang telah di-authenticate
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// ✅ Voucher Balances (Kelompok route dengan prefix "voucher-balances")
Route::prefix('voucher-balances')->group(function () {
    Route::get('/', [VoucherTypeController::class, 'getBalanceByVoucherType']);
    Route::get('/{accountId}', [VoucherTypeController::class, 'getBalanceByVoucherType']);
});

// ✅ Agent & Sales Routes
Route::get('/agent-sales', AgentSalesController::class);
Route::get('/recap-sales', RecapSalesController::class);

// ✅ Voucher Management (Menggunakan apiResource karena khusus API)
Route::apiResource('vouchers', VoucherTypeController::class);

// ✅ Transaction Reports & Summary
Route::prefix('transactions')->group(function () {
    Route::get('pivot', [TransactionController::class, 'pivot']);
    Route::get('summary', TransactionSummaryController::class);
    Route::apiResource('/', TransactionController::class);
});

// ✅ Transaction Categories (Read-Only API: hanya index() yang dibutuhkan)
Route::get('transaction-categories', [TransactionCategoryController::class, 'index']);

// ✅ Accounts Management
Route::apiResource('accounts', AccountController::class)->only('index', 'show');

// ✅ Account Balances
Route::apiResource('account-balances', AccountBalanceController::class);

// ✅ Voucher Transactions (Menggunakan apiResource karena CRUD API)
Route::apiResource('voucher-transactions', VoucherTransactionController::class);

// ✅ Voucher Agents (Read-Only API: hanya index())
Route::get('voucher-agents', VoucherAgenController::class);
