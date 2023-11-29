<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class kasir extends Model
{
    use HasFactory;
    protected $primaryKey = 'kodeKasir';
    protected $fillable = ['nama', 'HP'];


    protected $table = 'kasir';

    
    public $timestamps = true;
}