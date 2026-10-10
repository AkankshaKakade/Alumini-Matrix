import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AlumniPages.css";

const AlumniForm = ({ edit, alumniId }) => {
  const [formData, setFormData] = useState({
    name: "",
    batch: "",
    degree: "",
    company: "",
    designation: "",
    email: "",
    phone: "",
    linkedin: "",
  });

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (edit && alumniId) {
      axios.get(`http://localhost:5000/api/alumni/${alumniId}`).then((res) => {
        setFormData(res.data);
        if (res.data.profileImage) {
          setProfileImage(res.data.profileImage); // existing image
        }
      });
    }
  }, [edit, alumniId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (profileImage) {
      data.append("profileImage", profileImage);
    }

    try {
      if (edit) {
        await axios.put(
          `http://localhost:5000/api/alumni/${alumniId}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post("http://localhost:5000/api/alumni", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      alert("Form submitted!");
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div className="alumni-page">
      <div className="alumni-container">
        <h2>{edit ? "Edit Alumni" : "Add Alumni"}</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <div className="mb-3" key={key}>
              <label className="form-label">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type="text"
                className="form-control"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          {/* 🔹 Image Upload */}
          <div className="mb-3">
            <label className="form-label">Profile Image</label>
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>

          <button type="submit" className="btn btn-success">
            {edit ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AlumniForm;
