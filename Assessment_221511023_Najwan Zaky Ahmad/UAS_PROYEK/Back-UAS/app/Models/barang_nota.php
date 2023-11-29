<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class barang_nota extends Model
{
    use HasFactory;
    protected $primaryKey = 'kodeNotaBarang';
    protected $table = 'barang_nota';

    protected $fillable = ['kodeNota', 'kodeBarang', 'jumlahBarang', 'hargaSatuan','jumlah'];

    public function nota()
    {
        return $this->belongsTo('App\Models\nota', 'kodeNota');
    }

    public function barang()
    {
        return $this->belongsTo('App\Models\barang', 'kodeBarang');
    }

    public $timestamps = true;
}