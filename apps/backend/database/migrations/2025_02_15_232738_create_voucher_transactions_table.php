<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('voucher_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_id')->constrained('accounts')->onDelete('cascade');
            $table->foreignId('voucher_type_id')->constrained('voucher_types')->onDelete('cascade');
            $table->enum('transaction_type', ['in', 'out', 'sold']);
            $table->integer('quantity');
            $table->integer('price_at_transaction')->nullable();
            $table->integer('management_fee_at_transaction')->nullable();
            $table->integer('agent_commission_at_transaction')->nullable();
            $table->date('date_transaction');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voucher_stocks');
    }
};
