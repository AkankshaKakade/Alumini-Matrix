import { Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AlumniList from "./pages/AlumniList";
import AlumniForm from "./pages/AlumniForm";

function App() {
  return (
    <Routes>
      {/* Animated Opening Screen */}
      <Route path="/" element={<Hero />} />

      {/* Other Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/alumni" element={<AlumniList />} />
      <Route path="/alumni/add" element={<AlumniForm />} />
      <Route path="/alumni/edit/:id" element={<AlumniForm edit />} />
    </Routes>
  );
}

export default App;
