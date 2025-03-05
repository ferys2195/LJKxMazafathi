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
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nama akun (Vendor, Agen, Manajemen, atau Kas)
            $table->enum('role', ['vendor', 'agent', 'management', 'kas']); // Peran dalam sistem
            $table->boolean('is_management')->default(false); // Menandai apakah ini bagian dari manajemen
            $table->decimal('balance', 15, 2)->default(0); // Saldo
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};
