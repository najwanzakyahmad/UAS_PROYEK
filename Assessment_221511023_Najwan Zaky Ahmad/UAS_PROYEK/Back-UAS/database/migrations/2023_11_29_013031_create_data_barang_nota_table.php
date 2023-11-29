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
        Schema::create('barang_nota', function (Blueprint $table) {
            $table->id('kodeNotaBarang');
            $table->unsignedBigInteger('kodeNota');
            $table->foreign('kodeNota')->references('kodeNota')->on('nota');
            $table->unsignedBigInteger('kodeBarang');
            $table->foreign('kodeBarang')->references('kodeBarang')->on('barang');
            $table->smallInteger('jumlahBarang');
            $table->integer('hargaSatuan');
            $table->integer('jumlah');            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_barang_nota');
    }
};
