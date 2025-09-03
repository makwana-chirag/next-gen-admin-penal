import React, { useEffect, useState } from "react";
import API from "../api";

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    API.get("/inquiries")
      .then((res) => setInquiries(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto" }}>
      <h2>Inquiries</h2>
      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inq) => (
            <tr key={inq.id}>
              <td>{inq.id}</td>
              <td>{inq.name}</td>
              <td>{inq.email}</td>
              <td>{inq.message}</td>
              <td>{inq.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inquiries;
