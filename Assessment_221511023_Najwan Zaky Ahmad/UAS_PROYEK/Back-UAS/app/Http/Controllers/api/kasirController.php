<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\kasir;

class kasirController extends Controller
{
    public function addKasir(Request $request)
    {
        // Validasi data yang diterima dari permintaan
        $validator = Validator::make($request->all(), [
            'nama' => 'required||unique:kasir,nama',
            'HP' => 'required',
        ]);

        // Jika validasi gagal
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $kasir = new kasir([
            'nama' => $request->input('nama'),
            'HP' => $request->input('HP'),
        ]);

        
        $kasir->save();

        // Kembalikan respon sukses
        return response()->json(['message' => 'Data kasir berhasil disimpan'], 201);
    }

    public function getKasir()
    {
        $kasir = kasir::all();

        // Mengubah data yang dikembalikan
        $dataKasir = $kasir->map(function ($kasir) {
            return [
                'kodeKasir' => $kasir->kodeKasir,
                'nama' => $kasir->nama,
                'HP' => $kasir->HP,
            ];
        });

        return response()->json($dataKasir, 200);
    }

    

}