import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .required("Username is required"),
      password: Yup.string()
        .min(3, "Password must be at least 3 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const API_URL = process.env.VITE_API_URL;
        const res = await axios.post(`${API_URL}/admin/login`, values);

        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          navigate("/inquiries");
        } else {
          setErrors({ password: "Invalid username or password" });
        }
      } catch (err) {
        setErrors({ password: "Invalid username or password" });
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="flex items-center flex-col gap-10 justify-center min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-indigo-900">
        Next Gen Admin Panel
      </h1>
      <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md transition-transform transform hover:scale-[1.01]">
        <h2 className="text-3xl font-extrabold text-center text-indigo-500 mb-6">
          Admin Login
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 text-lg font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              className={`w-full px-4 py-2 border text-black bg-gray-100 rounded-lg focus:ring-2 focus:outline-none transition h-11 ${
                formik.touched.username && formik.errors.username
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-indigo-400"
              }`}
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="h-5">
              {formik.touched.username && formik.errors.username && (
                <p className="text-red-500 text-xs">{formik.errors.username}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-lg font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className={`w-full px-4 py-2 border text-black bg-gray-100 rounded-lg focus:ring-2 focus:outline-none transition h-11 pr-10 ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-indigo-400"
                }`}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 
             text-gray-500 hover:text-gray-700 
             bg-transparent border-none p-0 
             focus:outline-none focus:ring-0 active:outline-none"
              >
                {showPassword ? (
                  <FaEyeSlash className="pointer-events-none" />
                ) : (
                  <FaEye className="pointer-events-none" />
                )}
              </button>
            </div>
            <div className="h-5">
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs">{formik.errors.password}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg font-medium shadow-md hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-60"
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
