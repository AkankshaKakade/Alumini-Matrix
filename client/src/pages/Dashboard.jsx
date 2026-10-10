import { Link } from "react-router-dom";
import { FaUsers, FaPlus, FaHome } from "react-icons/fa";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Sidebar stays the same */}
      <aside className="sidebar">
        <h2>🎓 Alumni Manager</h2>
        <nav>
          <Link to="/dashboard"><FaHome /> Dashboard</Link>
          <Link to="/alumni"><FaUsers /> Alumni List</Link>
          <Link to="/alumni/add"><FaPlus /> Add Alumni</Link>
        </nav>
      </aside>

      {/* Main Content with Video */}
      <main className="main-content">
        {/* Background Video */}
        <video
          className="dashboard-video"
          autoPlay
          loop
          muted
        >
          <source src="/alumnivideo2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay Content */}
        <div className="main-overlay">
          <h1>Welcome to AlumniMatrix</h1>
          <p>
            Use the sidebar to manage alumni data, view lists, and add new alumni records.
          </p>
          <div className="dashboard-buttons">
            <Link to="/alumni" className="btn btn-primary m-2">👥 Alumni List</Link>
            <Link to="/alumni/add" className="btn btn-success m-2">➕ Add Alumni</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
