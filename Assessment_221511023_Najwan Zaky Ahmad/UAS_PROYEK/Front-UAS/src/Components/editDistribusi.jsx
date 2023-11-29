import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Typography } from "@material-tailwind/react";

function editDistribusi() {
  const [card, setCard] = useState({}); //untuk profil kurir
  const [lapak, setLapak] = useState([]);
  const [roti, setRoti] = useState([]);
  const [showAlert, setShowAlertSuccess] = useState(false);
  const [showNotifDelete, setShowAlertDelete] = useState(false);
  const [showNotifDelivered, setShowAlertDelivered] = useState(false);
  const [value, setValue] = useState("");
  const [dataTabel, setDataTabel] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tuplesPerPage = 5;

  const getKasir = async () => {
    try {
      console.log("id : ", idKurir);
      const response = await axios.get(
        "http://127.0.0.1:8000/api/kurir"
      );
      const userData = response.data;
      console.log("nama1", response);
      console.log("nama2", userData);
      setCard(userData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getBarang = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/lapak-id"
      );
      const dataLapak = response.data;
      console.log(dataLapak);
      setLapak(dataLapak);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getNota = async () => {
    try {
      console.log("Data Roti:", roti);
      const response = await axios.get(
        "http://127.0.0.1:8000/api/nota"
      );
      const dataRoti = response.data;
      console.log(dataRoti);
      setRoti(dataRoti);
      console.log("Data Roti:", roti);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getTenan = async () => {
    try {
      console.log("Data Roti:", roti);
      const response = await axios.get(
        "http://127.0.0.1:8000/api/tenan"
      );
      const dataRoti = response.data;
      console.log(dataRoti);
      setRoti(dataRoti);
      console.log("Data Roti:", roti);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Selected ${name}: ${value}`);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [formData, setFormData] = useState({
    jumlah_roti: " ",
    roti_id: " ",
  });

  const editLapak = async () => {
    console.log("Editing lapak with r:", idKurir, formData.roti_id, idLapak);
    console.log("FormData.roti_id:", formData.roti_id, formData.jumlah_roti);

    try {
      // e.preventDefault();
      const postData = {
        id_lapak: idLapak,
        id_roti: formData.roti_id,
        jumlah_roti_alokasi: formData.jumlah_roti,
        keterangan: "In Progress",
      };

      console.log("data : ", postData.keterangan);

      const postResponse = await axios.post(
        "http://127.0.0.1:8000/api/alokasi",
        postData
      );

      console.log("Data berhasil ditambahkan:", postResponse.data);
      setShowAlertSuccess(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const hapusAlokasi = async (idAlokasi) => {
    try {
      console.log("id alokasi:", idAlokasi);
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/alokasi/${idAlokasi}`
      );
      const dataAlokasi = response.data;
      console.log(dataAlokasi);
      window.location.reload();
    } catch {
      console.error("Error delete data:", error);
    }
  };

  const TABLE_HEAD = [
    "kodeKasir",
    "Nama",
    "HP",
    "",
  ];

  const fetchDataTabel = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/kasir"
      );
      const fetchedData = response.data;
      if (fetchedData.length === 0) {
        console.log("Data kosong");
      } else {
        setDataTabel(fetchedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const TABLE_HEAD2 = [
    "kodeTenan",
    "Nama Tenan",
    "HP",
    "",
  ];

  const fetchDataTabel2 = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/tenan"
      );
      const fetchedData = response.data;
      if (fetchedData.length === 0) {
        console.log("Data kosong");
      } else {
        setDataTabel(fetchedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const TABLE_HEAD3 = [
    "kode barang",
    "Nama barang",
    "satuan",
    "harga satuan",
    "stok",
    "",
  ];

  const fetchDataTabel3 = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/barang"
      );
      const fetchedData = response.data;
      if (fetchedData.length === 0) {
        console.log("Data kosong");
      } else {
        setDataTabel(fetchedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const TABLE_HEAD4 = [
    "kode nota",
    "Nama tenan",
    "kode kasir",
    "tanggal nota",
    "jam nota",
    "jumlah belanja",
    "diskon",
    "total",
    "",
  ];

  const fetchDataTabel4 = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/nota"
      );
      const fetchedData = response.data;
      if (fetchedData.length === 0) {
        console.log("Data kosong");
      } else {
        setDataTabel(fetchedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const buttonKeterangan = async (idAlokasi) => {
    console.log("Editing lapak with id:", idAlokasi);
    try {
      const data = {
        keterangan: "Done!",
      };

      const response = await axios.put(
        `http://127.0.0.1:8000/api/alokasi/${idAlokasi}`,
        data
      );
      console.log("Alokasi sudah di update", response.data);
      window.location.reload();
    } catch (error) {
      console.error("gagal", error);
    }
  };

  useEffect(() => {
    getKasir();
    getBarang();
    getNota();
    getTenan();
    fetchDataTabel();
    fetchDataTabel2();
    fetchDataTabel3();
    fetchDataTabel4();
  }, []);

  return (
    <>
     
        <Card
          className="pt-20 pb-0 sm:ml-64 overflow-y-auto flex items-center justify-center"
          style={{ maxHeight: "80vh", maxWidth: "85%" }}
        >
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataTabel
                .slice(
                  (currentPage - 1) * tuplesPerPage,
                  currentPage * tuplesPerPage
                )
                .map((rowData, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "even:bg-blue-gray-50/50" : ""}
                  >
                    {Object.values(rowData).map((value, colIndex) => (
                      <td key={colIndex} className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {value}
                        </Typography>
                      </td>
                    ))}

                    <td className="p-4">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        <button
                          onClick={() => {
                            setShowAlertDelivered(true);
                            setValue(rowData.id);
                          }}
                          className={`w-full p-2 text-white rounded-full transition duration-200 focus:outline-none focus-visible:outline-red-600 ${
                            rowData.keterangan === "Done!"
                              ? "bg-green-500 hover:bg-white hover:text-green-500"
                              : rowData.keterangan === "In Progress"
                              ? "bg-yellow-500 hover:bg-white hover:text-yellow-500"
                              : "bg-red-500 hover:bg-white hover:text-red-500"
                          }`}
                        >
                          {rowData.keterangan}
                        </button>
                      </Typography>
                    </td>

                    <td className="p-4">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        <button
                          onClick={() => {
                            setShowAlertDelete(true);
                            setValue(rowData.id);
                            // hapusAlokasi(rowData.id);
                          }}
                          className="w-full p-2 text-white bg-red-500 border border-red-500 rounded-full transition duration-200 hover:bg-white hover:text-red-500 focus:outline-none focus-visible:outline-red-600"
                        >
                          Cancel
                        </button>
                      </Typography>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Card>


        <Card
          className="pt-20 pb-0 sm:ml-64 overflow-y-auto flex items-center justify-center mt-5"
          style={{ maxHeight: "80vh", maxWidth: "85%" }}
        >
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD2.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataTabel
                .slice(
                  (currentPage - 1) * tuplesPerPage,
                  currentPage * tuplesPerPage
                )
                .map((rowData, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "even:bg-blue-gray-50/50" : ""}
                  >
                    {Object.values(rowData).map((value, colIndex) => (
                      <td key={colIndex} className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {value}
                        </Typography>
                      </td>
                    ))}

                    <td className="p-4">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        <button
                          onClick={() => {
                            setShowAlertDelivered(true);
                            setValue(rowData.id);
                          }}
                          className={`w-full p-2 text-white rounded-full transition duration-200 focus:outline-none focus-visible:outline-red-600 ${
                            rowData.keterangan === "Done!"
                              ? "bg-green-500 hover:bg-white hover:text-green-500"
                              : rowData.keterangan === "In Progress"
                              ? "bg-yellow-500 hover:bg-white hover:text-yellow-500"
                              : "bg-red-500 hover:bg-white hover:text-red-500"
                          }`}
                        >
                          {rowData.keterangan}
                        </button>
                      </Typography>
                    </td>

                    <td className="p-4">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        <button
                          onClick={() => {
                            setShowAlertDelete(true);
                            setValue(rowData.id);
                            // hapusAlokasi(rowData.id);
                          }}
                          className="w-full p-2 text-white bg-red-500 border border-red-500 rounded-full transition duration-200 hover:bg-white hover:text-red-500 focus:outline-none focus-visible:outline-red-600"
                        >
                          Cancel
                        </button>
                      </Typography>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Card>

        <Card
          className="pt-20 pb-0 sm:ml-64 overflow-y-auto flex items-center justify-center mt-5"
          style={{ maxHeight: "80vh", maxWidth: "85%" }}
        >
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD3.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataTabel
                .slice(
                  (currentPage - 1) * tuplesPerPage,
                  currentPage * tuplesPerPage
                )
                .map((rowData, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "even:bg-blue-gray-50/50" : ""}
                  >
                    {Object.values(rowData).map((value, colIndex) => (
                      <td key={colIndex} className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {value}
                        </Typography>
                      </td>
                    ))}

                    <td className="p-4">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        <button
                          onClick={() => {
                            setShowAlertDelivered(true);
                            setValue(rowData.id);
                          }}
                          className={`w-full p-2 text-white rounded-full transition duration-200 focus:outline-none focus-visible:outline-red-600 ${
                            rowData.keterangan === "Done!"
                              ? "bg-green-500 hover:bg-white hover:text-green-500"
                              : rowData.keterangan === "In Progress"
                              ? "bg-yellow-500 hover:bg-white hover:text-yellow-500"
                              : "bg-red-500 hover:bg-white hover:text-red-500"
                          }`}
                        >
                          {rowData.keterangan}
                        </button>
                      </Typography>
                    </td>

                    <td className="p-4">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        <button
                          onClick={() => {
                            setShowAlertDelete(true);
                            setValue(rowData.id);
                            // hapusAlokasi(rowData.id);
                          }}
                          className="w-full p-2 text-white bg-red-500 border border-red-500 rounded-full transition duration-200 hover:bg-white hover:text-red-500 focus:outline-none focus-visible:outline-red-600"
                        >
                          Cancel
                        </button>
                      </Typography>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Card>
      

        <Card
          className="pt-20 pb-0 sm:ml-64 overflow-y-auto flex items-center justify-center mt-5"
          style={{ maxHeight: "80vh", maxWidth: "85%" }}
        >
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD4.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataTabel
                .slice(
                  (currentPage - 1) * tuplesPerPage,
                  currentPage * tuplesPerPage
                )
                .map((rowData, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "even:bg-blue-gray-50/50" : ""}
                  >
                    {Object.values(rowData).map((value, colIndex) => (
                      <td key={colIndex} className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {value}
                        </Typography>
                      </td>
                    ))}

                    <td className="p-4">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        <button
                          onClick={() => {
                            setShowAlertDelivered(true);
                            setValue(rowData.id);
                          }}
                          className={`w-full p-2 text-white rounded-full transition duration-200 focus:outline-none focus-visible:outline-red-600 ${
                            rowData.keterangan === "Done!"
                              ? "bg-green-500 hover:bg-white hover:text-green-500"
                              : rowData.keterangan === "In Progress"
                              ? "bg-yellow-500 hover:bg-white hover:text-yellow-500"
                              : "bg-red-500 hover:bg-white hover:text-red-500"
                          }`}
                        >
                          {rowData.keterangan}
                        </button>
                      </Typography>
                    </td>

                    <td className="p-4">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        <button
                          onClick={() => {
                            setShowAlertDelete(true);
                            setValue(rowData.id);
                            // hapusAlokasi(rowData.id);
                          }}
                          className="w-full p-2 text-white bg-red-500 border border-red-500 rounded-full transition duration-200 hover:bg-white hover:text-red-500 focus:outline-none focus-visible:outline-red-600"
                        >
                          Cancel
                        </button>
                      </Typography>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Card>


    </>
  );
}

export default editDistribusi;
