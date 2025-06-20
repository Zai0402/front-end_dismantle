import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Sidebar from "../components/sidebar";
import axios from "axios";
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
import Footer from "../components/footer";

export default function Teknisi() {
  const userName = "Teknisi A";
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [ont, setOnt] = useState([]);
  const [teknisi, setTeknisi] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    setTimeout(() => AOS.refreshHard(), 100);
    getTeknisi();
    getAllOnt();
  }, []);

  const getAllOnt = async () => {
    try {
      const response = await axios.get(
        "https://back-enddismantle.vercel.app/ont"
      );
      setOnt(response.data);
    } catch (error) {
      console.error("Error fetching all ONT data:", error);
    }
  };

  const getOntByTeknisi = async (id) => {
    try {
      const response = await axios.get(
        `https://back-enddismantle.vercel.app/ont-teknisi/${id}`
      );
      setOnt(response.data);
    } catch (error) {
      console.error("Error fetching ONT data:", error);
    }
  };

  const getTeknisi = async () => {
    try {
      const response = await axios.get(
        `https://back-enddismantle.vercel.app/teknisi`
      );
      setTeknisi(response.data);
    } catch (error) {
      console.error("Error fetching teknisi data:", error);
    }
  };

  const handleSelectTeam = (teamId) => {
    const team = teknisi.find((t) => t.id === teamId);
    setSelectedTeam(team);
    getOntByTeknisi(teamId);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 mt-12 sm:mt-0">
      <AdminSidebar />

      <main className="flex-1 flex flex-col">
        <header className="hidden sm:flex bg-white shadow px-6 py-4 justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Tim Teknisi</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm">👷 {userName}</span>
            <a
              href="#"
              className="group relative flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 transition-all duration-200"
            >
              <div className="absolute left-0 top-0 h-full w-1 bg-red-500 rounded-r opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-y-100 scale-y-80"></div>
              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center mr-3 group-hover:bg-red-200 transition-colors duration-200">
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="h-5 w-5 text-red-500 group-hover:text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  ></path>
                </svg>
              </div>
              <span className="font-medium text-gray-700 group-hover:text-red-600">
                Logout
              </span>
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                className="h-3 w-3 text-gray-400 ml-auto group-hover:text-red-500"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                ></path>
              </svg>
            </a>
          </div>
        </header>

        <div className="p-6 flex-1">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Daftar Teknisi
            </h2>
            <button
              onClick={() => alert("Tambah Teknisi")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow transition"
            >
              + Tambah Teknisi
            </button>
          </div>

          <div
            data-aos="zoom-out"
            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:mb-6 flex sm:flex-none overflow-x-auto space-x-4 sm:space-x-0 pb-4 w-full whitespace-nowrap"
          >
            {teknisi.map((item) => (
              <div
                key={item.id}
                className={`relative min-w-[200px] sm:min-w-0 flex-shrink-0 p-4 rounded shadow transition-all duration-300 ${
                  selectedTeam?.id === item.id
                    ? "bg-blue-100 border-blue-500 border"
                    : "bg-white hover:bg-blue-50"
                }`}
              >
                <div
                  onClick={() => handleSelectTeam(item.id)}
                  className="cursor-pointer text-center"
                >
                  <p className="text-sm font-semibold text-gray-800">
                    {item.name}
                  </p>
                </div>
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    className="text-yellow-600 hover:text-yellow-800"
                    onClick={() => alert(`Edit teknisi ${item.name}`)}
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => alert(`Hapus teknisi ${item.name}`)}
                    title="Hapus"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">
              Dismantle Oleh {selectedTeam?.name || "-"}
            </h2>

            <div className="overflow-x-auto hidden md:block">
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-200 text-sm text-black font-semibold">
                    <th className="px-5 py-3 text-left">Nama</th>
                    <th className="px-5 py-3 text-left">Alamat</th>
                    <th className="px-5 py-3 text-left">Kontak</th>
                    <th className="px-5 py-3 text-left">Status</th>
                    <th className="px-5 py-3 text-left">Catatan</th>
                    <th className="px-5 py-3 text-left">Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {ont.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`text-sm ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition`}
                      data-aos="fade-up"
                      data-aos-delay={idx * 100}
                    >
                      <td className="px-5 py-3 text-gray-800">
                        {row.nama_user}
                      </td>
                      <td className="px-5 py-3 text-gray-800">{row.alamat}</td>
                      <td className="px-5 py-3 text-gray-800">{row.telp}</td>
                      <td className="px-5 py-3 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                          <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
                          {row.status_dismantle}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-gray-800">
                        {row.keterangan}
                      </td>
                      <td className="px-5 py-3 text-gray-800">{row.tanggal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
        <Footer />
      </main>
    </div>
  );
}
