<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class barang extends Model
{
    use HasFactory;
    protected $primaryKey = 'kodeBarang';
    protected $fillable = ['namaBarang', 'satuan', 'hargaSatuan', 'stok'];

    protected $table = 'barang';
    


    public $timestamps = true;
}