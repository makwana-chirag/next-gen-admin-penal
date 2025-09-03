import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Inquiries from "./components/Inquiries";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <Navigate to="/inquiries" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/login"
          element={token ? <Navigate to="/inquiries" replace /> : <Login />}
        />

        <Route
          path="/inquiries"
          element={
            <ProtectedRoute>
              <Inquiries />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
