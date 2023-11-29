<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\barang_nota;


class notaBarangController extends Controller
{
    public function addNotaBarang(Request $request)
    {
        // Validasi data yang diterima dari permintaan
        $validator = Validator::make($request->all(), [
            'kodeNota' => 'required',
            'kodeBarang' => 'required',
            'jumlahBarang' => 'required',
            'hargaSatuan' => 'required',
        ]);

        // Jika validasi gagal
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }


        
        
        $notaBarang = new barang_nota([
            'kodeNota' => $request->input('kodeNota'),
            'kodeBarang' => $request->input('kodeBarang'),
            'jumlahBarang' => $request->input('jumlahBarang'),
            'hargaSatuan' => $request->input('hargaSatuan'),
            'jumlah' => $request->input('jumlahBarang') * $request->input('hargaSatuan'),
        ]);

        
        $notaBarang -> save();

        // Kembalikan respon sukses
        return response()->json(['message' => 'Data nota barang berhasil disimpan'], 201);
    }

    public function getNotaBarang()
    {
        $notaBarang = barang_nota::all();

        // Mengubah data yang dikembalikan
        $dataNotaBarang = $notaBarang -> map(function ($notaBarang) {
            return [
                'kodeNota' => $notaBarang->kodeNota,
                'kodeBarang' => $notaBarang->kodeBarang,
                'jumlahBarang' => $notaBarang->jumlahBarang,
                'hargaSatuan' => $notaBarang->barang->hargaSatuan,
                'jumlah' => $notaBarang->jumlah,
            ];
        });

        return response()->json($dataNotaBarang, 200);
    }

    

}