<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tenan extends Model
{
    use HasFactory;

    protected $primaryKey = 'kodeTenan';
    protected $fillable = ['namaTenan', 'HP'];

    protected $table = 'tenan';



    public $timestamps = true;
}