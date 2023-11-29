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
        Schema::create('nota', function (Blueprint $table) {
            $table->id('kodeNota');
            $table->unsignedBigInteger('kodeTenan');
            $table->foreign('kodeTenan')->references('kodeTenan')->on('tenan');
            $table->unsignedBigInteger('kodeKasir');
            $table->foreign('kodeKasir')->references('kodeKasir')->on('kasir');
            $table->date('tglNota');
            $table->time('jamNota');
            $table->integer('jumlahBelanja');
            $table->smallInteger('diskon');
            $table->integer('total');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_nota');
    }
};
