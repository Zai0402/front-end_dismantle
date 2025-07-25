import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import AdminSidebar from "../components/adminSidebar";
import {
  Plus,
  Search,
  Filter,
  Eye,
  Pencil,
  Trash2,
  MessageCircle,
  MapPin,
} from "lucide-react";
import axios from "axios";
import * as XLSX from "xlsx";
import Footer from "../components/footer";

export default function OntData() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [ontList, setOntList] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const userName = "Admin";

  useEffect(() => {
    getOnt();
  }, []);

  const filtered = ontList.filter((item) => {
    const matchesSearch =
      item.sn_ont?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.alamat?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "" || item.status_pd === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getOnt = async () => {
    try {
      const response = await axios.get(
        "https://back-enddismantle.vercel.app/ont"
      );
      setOntList(response.data);
      console.log("Data ONT:", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filtered);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DataONT");
    XLSX.writeFile(wb, "Data_ONT.xlsx");
  };

  const uniqueStatuses = [
    ...new Set(ontList.map((item) => item.status_pd).filter(Boolean)),
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 mt-12 sm:mt-0">
      <AdminSidebar />
      <main className="flex-1 flex flex-col">
        <header className="hidden sm:flex bg-white shadow px-6 py-4 justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Beranda Admin</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm">👷 {userName}</span>
            <a
              href="#"
              className="group relative flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 transition-all duration-200"
            >
              <div class="absolute left-0 top-0 h-full w-1 bg-red-500 rounded-r opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-y-100 scale-y-80"></div>
              <div class="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center mr-3 group-hover:bg-red-200 transition-colors duration-200">
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  class="h-5 w-5 text-red-500 group-hover:text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <span class="font-medium text-gray-700 group-hover:text-red-600">
                Logout
              </span>
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                class="h-3 w-3 text-gray-400 ml-auto group-hover:text-red-500"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </header>

        <div className="p-6">
          <div className="bg-white rounded-3xl shadow p-6 max-w-7xl mx-auto">
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Data ONT</h2>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 cursor-pointer rounded-xl flex items-center gap-1">
                  <Plus size={16} /> Tambah ONT
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4">
                <input
                  type="text"
                  placeholder="Cari SN / Lokasi"
                  className="w-full px-4 py-2 border rounded-xl shadow-sm text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                  className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-10 rounded-xl leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">Semua Status</option>
                  {uniqueStatuses.map((status, idx) => (
                    <option key={idx} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <button
                  onClick={exportToExcel}
                  className="bg-green-500 hover:bg-green-600 text-white cursor-pointer px-4 py-2 rounded-xl text-sm w-full"
                >
                  Export Excel
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="block overflow-x-auto max-w-full">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-200 text-sm text-black font-semibold">
                      <th className="px-5 py-3 text-left whitespace-nowrap">
                        No
                      </th>
                      <th className="px-5 py-3 text-left whitespace-nowrap">
                        SN ONT
                      </th>
                      <th className="px-5 py-3 text-left whitespace-nowrap">
                        No PA
                      </th>
                      <th className="px-5 py-3 text-left whitespace-nowrap">
                        ID Pelanggan
                      </th>
                      <th className="px-5 py-3 text-left whitespace-nowrap">
                        Nama
                      </th>
                      <th className="px-5 py-3 text-left whitespace-nowrap">
                        ID PD
                      </th>
                      <th className="px-5 py-3 text-left whitespace-nowrap">
                        Status PD
                      </th>
                      <th className="px-5 py-3 text-left whitespace-nowrap">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((item, idx) => (
                      <Dialog.Root key={idx}>
                        <Dialog.Trigger asChild>
                          <tr
                            className={`cursor-pointer text-sm ${
                              idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                            } hover:bg-gray-100 transition`}
                            onClick={() => setSelectedRow(item)}
                          >
                            <td className="px-5 py-3 text-gray-800">
                              {idx + 1}
                            </td>
                            <td className="px-5 py-3 text-gray-800">
                              {item.sn_ont}
                            </td>
                            <td className="px-5 py-3 text-gray-800">
                              {item.no_pa}
                            </td>
                            <td className="px-5 py-3 text-gray-800">
                              {item.id_pelanggan}
                            </td>
                            <td className="px-5 py-3 text-gray-800">
                              {item.nama_user}
                            </td>
                            <td className="px-5 py-3 text-gray-800">
                              {item.id_pd}
                            </td>
                            <td className="px-5 py-3 text-center">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
                                {item.status_pd}
                              </span>
                            </td>
                            <td className="px-5 py-3 text-gray-800">
                              <div className="flex">
                                <button className="border cursor-pointer border-yellow-500 rounded-md p-1 text-yellow-600 hover:bg-yellow-500 hover:text-white transition duration-200 ml-2">
                                  <Pencil size={16} />
                                </button>

                                <button className="border cursor-pointer border-red-500 rounded-md p-1 text-red-600 hover:bg-red-500 hover:text-white transition duration-200 ml-2">
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        </Dialog.Trigger>

                        <Dialog.Portal>
                          <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
                          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 w-[90%] max-w-4xl shadow-2xl z-50">
                            <Dialog.Title className="text-2xl font-semibold mb-4 border-b pb-2 text-gray-800">
                              Detail ONT
                            </Dialog.Title>

                            <div className="grid grid-cols-2 gap-6 text-sm text-gray-700">
                              {/* Kiri */}
                              <div className="space-y-3">
                                <div>
                                  <p className="font-medium">SN ONT</p>
                                  <p className="text-gray-600">{item.sn_ont}</p>
                                </div>
                                <div>
                                  <p className="font-medium">No PA</p>
                                  <p className="text-gray-600">{item.no_pa}</p>
                                </div>
                                <div>
                                  <p className="font-medium">ID Pelanggan</p>
                                  <p className="text-gray-600">
                                    {item.id_pelanggan}
                                  </p>
                                </div>
                                <div>
                                  <p className="font-medium">Nama</p>
                                  <p className="text-gray-600">
                                    {item.nama_user}
                                  </p>
                                </div>
                                <div>
                                  <p className="font-medium">ID PD</p>
                                  <p className="text-gray-600">{item.id_pd}</p>
                                </div>
                                <div>
                                  <p className="font-medium">Status PD</p>
                                  <p className="text-gray-600">
                                    {item.status_pd}
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-3">
                                <div>
                                  <p className="font-medium">Alamat</p>
                                  <p className="text-gray-600">
                                    {item.alamat || "-"}
                                  </p>
                                </div>
                                <div>
                                  <p className="font-medium">Kontak</p>
                                  <p className="text-gray-600">
                                    {item.telp || "-"}
                                  </p>
                                </div>
                                <div>
                                  <p className="font-medium">
                                    Status Dismantle
                                  </p>
                                  <p className="text-gray-600">
                                    {item.status_dismantle || "-"}
                                  </p>
                                </div>
                                <div>
                                  <p className="font-medium">Keterangan</p>
                                  <p className="text-gray-600">
                                    {item.keterangan || "-"}
                                  </p>
                                </div>
                                <div>
                                  <p className="font-medium">Tanggal</p>
                                  <p className="text-gray-600">
                                    {item.tanggal || "-"}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <Dialog.Close className="absolute top-4 right-4 text-gray-400 hover:text-red-600 text-xl">
                              ✕
                            </Dialog.Close>
                          </Dialog.Content>
                        </Dialog.Portal>
                      </Dialog.Root>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
