<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\barang;

class barangController extends Controller
{
    public function addBarang(Request $request)
    {
        // Validasi data yang diterima dari permintaan
        $validator = Validator::make($request->all(), [
            // 'kodeBarang' => 'required|unique:barang,kodeBarang',
            'namaBarang' => 'required',
            'satuan' => 'required',
            'hargaSatuan' => 'required',
            'stok' => 'required',
        ]);

        // Jika validasi gagal
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $barang = new barang([
            // 'kodeBarang' => $request->input('kodeBarang'),
            'namaBarang' => $request->input('namaBarang'),
            'satuan' => $request->input('satuan'),
            'hargaSatuan' => $request->input('hargaSatuan'),
            'stok' => $request->input('stok'),
        ]);

        

        $barang->save();

        // Kembalikan respon sukses
        return response()->json(['message' => 'Data barang berhasil disimpan'], 201);
    }

    public function getBarang()
    {
        $barang = barang::all();

        // Mengubah data yang dikembalikan
        $dataBarang = $barang->map(function ($barang) {
            return [
                'kodeBarang' => $barang->kodeBarang,
                'namaBarang' => $barang->namaBarang,
                'satuan' => $barang->satuan,
                'hargaSatuan' => $barang->hargaSatuan,
                'stok' => $barang->stok,
            ];
        });

        return response()->json($dataBarang, 200);
    }

    public function showData($id)
    {
        try{
            $barang = barang::findOrFail($id);
            return response()->json($barang);
        }
        catch(\Exception $e){
            return response()->json(['message' => 'barang tidak ditemukan'], 404);
        }
    }


    public function updateBarang(Request $request, $id)
    {
        $barang = barang::find($id);

        if (!$barang) {
            return response()->json(['message' => 'Data barang tidak ditemukan'], 404);
        }

        // Validasi hanya bidang-bidang tertentu yang diizinkan diubah
        $validator = Validator::make($request->all(), [
            'namaBarang' => 'required',
            'satuan' => 'required',
            'hargaSatuan' => 'required',
            'stok' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $barang->namaBarang = $request->input('namaBarang');
        $barang->satuan = $request->input('satuan');
        $barang->hargaSatuan = $request->input('hargaSatuan');
        $barang->stok = $request->input('stok');
        $barang->save();

        return response()->json(['message' => 'Data barang berhasil diperbarui'], 200);
    }

    public function deleteBarang($id)
    {
        $barang = barang::find($id);

        if (!$barang) {
            return response()->json(['message' => 'Data barang tidak ditemukan'], 404);
        }

        $barang->delete();

        return response()->json(['message' => 'Data barang berhasil dihapus'], 200);
    }

}