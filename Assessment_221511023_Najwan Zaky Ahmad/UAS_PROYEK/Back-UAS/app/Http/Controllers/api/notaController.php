<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\nota;

class notaController extends Controller
{
    public function addNota(Request $request)
    {
        // Validasi data yang diterima dari permintaan
        $validator = Validator::make($request->all(), [
            'kodeTenan' => 'required',
            'kodeKasir' => 'required',
            'tglNota' => 'required',
            'jamNota' => 'required',
            'jumlahBelanja' => 'required',
            'diskon' => 'required',
        ]);

        // Jika validasi gagal
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $nota = new nota([
            'kodeTenan' => $request->input('kodeTenan'),
            'kodeKasir' => $request->input('kodeKasir'),
            'tglNota' => $request->input('tglNota'),
            'jamNota' => $request->input('jamNota'),
            'jumlahBelanja' => $request->input('jumlahBelanja'),
            'diskon' => $request->input('diskon'),
            'total' => $total = $request->input('jumlahBelanja') - ($request->input('jumlahBelanja') * $request->input('diskon') / 100),
        ]);

        
        $nota->save();

        // Kembalikan respon sukses
        return response()->json(['message' => 'Data nota berhasil disimpan'], 201);
    }

    public function getNota()
    {
        $nota = nota::all();

        // Mengubah data yang dikembalikan
        $dataNota = $nota->map(function ($nota) {
            return [
                'kodeNota' => $nota->kodeNota,
                'kodeTenan' => $nota->tenan->namaTenan,
                'kodeKasir' => $nota->kasir->nama,
                'tglNota' => $nota->tglNota,
                'jamNota' => $nota->jamNota,
                'jumlahBelanja' => $nota->jumlahBelanja,
                'diskon' => $nota->diskon,
                'total' => $nota->total,
            ];
        });

        return response()->json($dataNota, 200);
    }

    

}