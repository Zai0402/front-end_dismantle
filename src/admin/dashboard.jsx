import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AdminSidebar from "../components/adminSidebar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../components/footer";

const customers = [
  // ... (data seperti sebelumnya)
];

const barData = [
  { name: "Jan", customers: 400 },
  { name: "Feb", customers: 300 },
  { name: "Mar", customers: 500 },
  { name: "Apr", customers: 600 },
  { name: "May", customers: 700 },
];

const lineData = [
  { name: "Week 1", members: 150 },
  { name: "Week 2", members: 180 },
  { name: "Week 3", members: 170 },
  { name: "Week 4", members: 190 },
];

export default function AdminDashboard() {
  const userName = "Admin User";

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 mt-12 sm:mt-0">
        <AdminSidebar />
        <main className="flex-1 flex flex-col">
            <header className="hidden sm:flex bg-white shadow px-6 py-4 justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">Beranda Admin</h1>
                <div className="flex items-center gap-4">
                    <span className="text-gray-600 text-sm">👷 {userName}</span>
                    <a href="#" className="group relative flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 transition-all duration-200">
                    <div className="absolute left-0 top-0 h-full w-1 bg-red-500 rounded-r opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-y-100 scale-y-80"></div>
                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center mr-3 group-hover:bg-red-200 transition-colors duration-200">
                        <svg fill="currentColor" viewBox="0 0 20 20" className="h-5 w-5 text-red-500 group-hover:text-red-600">
                        <path clipRule="evenodd" fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" />
                        </svg>
                    </div>
                    <span className="font-medium text-gray-700 group-hover:text-red-600">Logout</span>
                    <svg fill="currentColor" viewBox="0 0 20 20" className="h-3 w-3 text-gray-400 ml-auto group-hover:text-red-500">
                        <path clipRule="evenodd" fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                    </svg>
                    </a>
                </div>
            </header>

            <div className="p-6 flex-1">
                <div className="bg-gray-50 p-6 rounded-3xl shadow-lg max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div data-aos="fade-up" data-aos-delay="100" className="bg-white rounded-xl p-4 flex items-center gap-4 shadow">
                            <div className="bg-green-100 p-2 rounded-full">
                                <span className="text-green-500 text-xl">👥</span>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Total Customers</p>
                                <p className="text-2xl font-bold">5,423</p>
                                <p className="text-sm text-green-500">▲ 16% this month</p>
                            </div>
                        </div>

                        <div data-aos="fade-up" data-aos-delay="150" className="bg-white rounded-xl p-4 flex items-center gap-4 shadow">
                            <div className="bg-green-100 p-2 rounded-full">
                                <span className="text-green-500 text-xl">👤</span>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Members</p>
                                <p className="text-2xl font-bold">1,893</p>
                                <p className="text-sm text-red-500">▼ 1% this month</p>
                            </div>
                        </div>

                        <div data-aos="fade-up" data-aos-delay="200" className="bg-white rounded-xl p-4 flex items-center gap-4 shadow">
                            <div className="bg-blue-100 p-2 rounded-full">
                                <span className="text-blue-500 text-xl">📶</span>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Jumlah ONT</p>
                                <p className="text-2xl font-bold">340</p>
                            </div>
                        </div>

                        <div data-aos="fade-up" data-aos-delay="250" className="bg-white rounded-xl p-4 flex items-center gap-4 shadow">
                            <div className="bg-purple-100 p-2 rounded-full">
                                <span className="text-purple-500 text-xl">🧰</span>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Tim Teknisi</p>
                                <p className="text-2xl font-bold">12</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div data-aos="fade-right" data-aos-delay="300" className="bg-white p-4 rounded-xl shadow">
                            <h3 className="text-lg font-semibold mb-2">Customer Growth</h3>
                            <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={barData}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="customers" fill="#34D399" />
                            </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div data-aos="fade-left" data-aos-delay="350" className="bg-white p-4 rounded-xl shadow">
                            <h3 className="text-lg font-semibold mb-2">Member Activity</h3>
                            <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={lineData}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="members" stroke="#60A5FA" strokeWidth={2} />
                            </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
       </main>
    </div>
  );
}
