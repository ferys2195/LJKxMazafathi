<?php

use App\Enums\TransactionType;
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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_id')->constrained('accounts')->onDelete('cascade'); // Relasi ke tabel accounts
            $table->foreignId('transaction_category_id')->constrained('transaction_categories')->onDelete('cascade'); // Relasi ke tabel Transaksi Kategori
            $table->text('description'); // Deskripsi transaksi
            $table->enum('transaction_type', [
                TransactionType::IN->value,
                TransactionType::OUT->value,
            ]); // Jenis transaksi (masuk / keluar)
            $table->decimal('amount', 15, 2); // Jumlah transaksi
            $table->date('transaction_date'); // Tanggal transaksi
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
