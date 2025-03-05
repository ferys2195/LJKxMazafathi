<?php

namespace Database\Seeders;

use App\Models\VoucherTransaction;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VoucherTransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $transactions = [
            ["date_transaction" => "2025-01-21", "account_id" => 5, "voucher_type_id" => 2, "transaction_type" => "In", "price_at_transaction" => 4000, "quantity" => 1000],
            ["date_transaction" => "2025-01-21", "account_id" => 5, "voucher_type_id" => 3, "transaction_type" => "In", "price_at_transaction" => 10000, "quantity" => 72],
            ["date_transaction" => "2025-01-21", "account_id" => 5, "voucher_type_id" => 4, "transaction_type" => "In", "price_at_transaction" => 20000, "quantity" => 71],
            ["date_transaction" => "2025-01-21", "account_id" => 5, "voucher_type_id" => 5, "transaction_type" => "In", "price_at_transaction" => 70000, "quantity" => 98],
            ["date_transaction" => "2025-01-21", "account_id" => 5, "voucher_type_id" => 6, "transaction_type" => "In", "price_at_transaction" => 200000, "quantity" => 44],
            ["date_transaction" => "2025-01-21", "account_id" => 3, "voucher_type_id" => 3, "transaction_type" => "Out", "price_at_transaction" => 10000, "quantity" => 14],
            ["date_transaction" => "2025-01-21", "account_id" => 3, "voucher_type_id" => 4, "transaction_type" => "Out", "price_at_transaction" => 20000, "quantity" => 22],
            ["date_transaction" => "2025-01-21", "account_id" => 3, "voucher_type_id" => 5, "transaction_type" => "Out", "price_at_transaction" => 70000, "quantity" => 20],
            ["date_transaction" => "2025-01-21", "account_id" => 3, "voucher_type_id" => 6, "transaction_type" => "Out", "price_at_transaction" => 200000, "quantity" => 19],
            ["date_transaction" => "2025-01-21", "account_id" => 4, "voucher_type_id" => 3, "transaction_type" => "Out", "price_at_transaction" => 10000, "quantity" => 33],
            ["date_transaction" => "2025-01-21", "account_id" => 4, "voucher_type_id" => 4, "transaction_type" => "Out", "price_at_transaction" => 20000, "quantity" => 26],
            ["date_transaction" => "2025-01-31", "account_id" => 5, "voucher_type_id" => 2, "transaction_type" => "Sold", "price_at_transaction" => 4000, "quantity" => 1,  "management_fee_at_transaction" => 1000, "agent_commission_at_transaction" => 1000],
            ["date_transaction" => "2025-02-14", "account_id" => 3, "voucher_type_id" => 2, "transaction_type" => "Sold", "price_at_transaction" => 4000, "quantity" => 438,  "management_fee_at_transaction" => 438000, "agent_commission_at_transaction" => 438000],
            ["date_transaction" => "2025-02-14", "account_id" => 3, "voucher_type_id" => 3, "transaction_type" => "Sold", "price_at_transaction" => 10000, "quantity" => 61,  "management_fee_at_transaction" => 61000, "agent_commission_at_transaction" => 61000],
            ["date_transaction" => "2025-02-15", "account_id" => 4, "voucher_type_id" => 2, "transaction_type" => "Sold", "price_at_transaction" => 4000, "quantity" => 253,  "management_fee_at_transaction" => 253000, "agent_commission_at_transaction" => 253000],
            ["date_transaction" => "2025-02-17", "account_id" => 2, "voucher_type_id" => 2, "transaction_type" => "Sold", "price_at_transaction" => 4000, "quantity" => 53, "management_fee_at_transaction" => 53000, "agent_commission_at_transaction" => 53000],
        ];
        foreach ($transactions as $transaction) {
            VoucherTransaction::create($transaction);
        }
    }
}
