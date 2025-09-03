import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

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
        const res = await axios.post("http://localhost:5000/login", values);

        if (res.data.success) {
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4">
      <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md transition-transform transform hover:scale-[1.02]">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          Admin Login
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition ${
                formik.touched.username && formik.errors.username
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-indigo-400"
              }`}
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.username}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-indigo-400"
              }`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Button */}
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
