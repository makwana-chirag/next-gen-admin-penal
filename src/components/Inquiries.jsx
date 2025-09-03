import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL;

    const fetchInquiries = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/inquiries`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInquiries(res.data);
      } catch (err) {
        setError("Failed to load inquiries");
      }
    };

    fetchInquiries();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="w-[1400px] min-h-[90vh]">
      <header className="flex justify-between items-center rounded-md px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md">
        <h1 className="text-2xl font-bold tracking-wide">
          NextGen Admin Panel
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
        >
          <FiLogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </header>

      <div className="w-full px-8 mt-10">
        <h2 className="text-3xl font-bold text-indigo-800 mb-8 text-center">
          Inquiries
        </h2>

        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 bg-white">
          <table className="w-full border-collapse text-base">
            <thead className="bg-gradient-to-r from-indigo-500 to-indigo-500 text-white">
              <tr>
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Message</th>
                <th className="px-6 py-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-gray-500 italic text-lg"
                  >
                    No inquiries found
                  </td>
                </tr>
              ) : (
                inquiries.map((inq, idx) => (
                  <tr
                    key={inq.id}
                    className={`${
                      idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-blue-50 transition text-start`}
                  >
                    <td className="px-6 py-4  text-gray-600">{inq.id}</td>
                    <td className="px-6 py-4 text-gray-600">{inq.name}</td>
                    <td className="px-6 py-4 text-gray-600">{inq.email}</td>
                    <td className="px-6 py-4 text-gray-600">{inq.message}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {inq.created_at}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {error && (
          <p className="mt-6 text-center text-red-500 font-medium text-lg">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Inquiries;
