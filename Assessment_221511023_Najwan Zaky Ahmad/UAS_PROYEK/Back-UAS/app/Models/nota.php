<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class nota extends Model
{
    use HasFactory;
    protected $primaryKey = 'kodeNota';
    protected $fillable = ['kodeTenan', 'kodeKasir', 'tglNota', 'jamNota', 'jumlahBelanja', 'diskon', 'total'];

    protected $table = 'nota';


    public function tenan()
    {
        return $this->belongsTo('App\Models\tenan', 'kodeTenan');
    }

    public function kasir()
    {
        return $this->belongsTo('App\Models\kasir', 'kodeKasir');
    }
}