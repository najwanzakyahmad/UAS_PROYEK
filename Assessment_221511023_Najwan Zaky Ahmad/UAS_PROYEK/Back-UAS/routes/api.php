<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\barangController;
use App\Http\Controllers\api\kasirController;
use App\Http\Controllers\api\tenanController;
use App\Http\Controllers\api\notaController;
use App\Http\Controllers\api\notaBarangController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


// Barang
Route::post('/barang', 'App\Http\Controllers\Api\barangController@addBarang');
Route::get('/barang', 'App\Http\Controllers\Api\barangController@getBarang');
Route::get('/barang/{id}', 'App\Http\Controllers\Api\barangController@showData');
Route::put('/barang/{id}', 'App\Http\Controllers\Api\barangController@updateBarang');
Route::delete('/barang/{id}', 'App\Http\Controllers\Api\barangController@deleteBarang');

// Kasir
Route::post('/kasir', 'App\Http\Controllers\Api\kasirController@addKasir');
Route::get('/kasir', 'App\Http\Controllers\Api\kasirController@getKasir');

// tenan
Route::post('/tenan', 'App\Http\Controllers\Api\tenanController@addTenan');
Route::get('/tenan', 'App\Http\Controllers\Api\tenanController@getTenan');

// nota
Route::post('/nota', 'App\Http\Controllers\Api\notaController@addNota');
Route::get('/nota', 'App\Http\Controllers\Api\notaController@getNota');

// nota barang
Route::post('/nota-barang', 'App\Http\Controllers\Api\notaBarangController@addNotaBarang');
Route::get('/nota-barang', 'App\Http\Controllers\Api\notaBarangController@getNotaBarang');

//test