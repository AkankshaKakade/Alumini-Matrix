import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AlumniPages.css"; // New CSS file

const AlumniList = () => {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const load = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/alumni");
      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.data)
        ? res.data.data
        : Array.isArray(res.data.alumni)
        ? res.data.alumni
        : [];
      setList(data);
    } catch (error) {
      console.error("Error loading alumni:", error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filteredList = list.filter((alumni) =>
    alumni.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="alumni-page">
      <div className="alumni-container">
        <h2>Alumni List</h2>

        {/* 🔍 Search Bar */}
        <input
          type="text"
          placeholder="Search by name..."
          className="form-control mb-3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <table className="table table-bordered table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Batch</th>
              <th>Degree</th>
              <th>Company</th>
              <th>Designation</th>
              <th>Email</th>
              <th>Phone</th>
              <th>LinkedIn</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.length > 0 ? (
              filteredList.map((alumni) => (
                <tr key={alumni._id}>
                  <td>
                    {alumni.profileImage ? (
                      <img
                        src={`http://localhost:5000${alumni.profileImage}`}
                        alt={alumni.name}
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                          border: "2px solid #ddd",
                        }}
                      />
                    ) : (
                      <span>No image</span>
                    )}
                  </td>
                  <td>{alumni.name}</td>
                  <td>{alumni.batch}</td>
                  <td>{alumni.degree}</td>
                  <td>{alumni.company}</td>
                  <td>{alumni.designation}</td>
                  <td>{alumni.email}</td>
                  <td>{alumni.phone}</td>
                  <td>
                    {alumni.linkedin ? (
                      <a
                        href={alumni.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Profile
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    <button className="btn btn-primary btn-sm">Edit</button>
                    <button className="btn btn-danger btn-sm ms-2">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">
                  No alumni found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlumniList;
