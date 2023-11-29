<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\tenan;

class tenanController extends Controller
{
    public function addTenan(Request $request)
    {
        // Validasi data yang diterima dari permintaan
        $validator = Validator::make($request->all(), [
            'namaTenan' => 'required',
            'HP' => 'required',
        ]);

        // Jika validasi gagal
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $tenan = new tenan([
            'namaTenan' => $request->input('namaTenan'),
            'HP' => $request->input('HP'),
        ]);

        
        $tenan->save();

        // Kembalikan respon sukses
        return response()->json(['message' => 'Data tenan berhasil disimpan'], 201);
    }

    public function getTenan()
    {
        $tenan = tenan::all();

        // Mengubah data yang dikembalikan
        $dataTenan = $tenan->map(function ($tenan) {
            return [
                'kodeTenan' => $tenan->kodeTenan,
                'namaTenan' => $tenan->namaTenan,
                'HP' => $tenan->HP,
            ];
        });

        return response()->json($dataTenan, 200);
    }

    

}