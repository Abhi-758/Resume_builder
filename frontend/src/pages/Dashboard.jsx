import React, { useState } from "react";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  // Resume data state shared by form and preview
  const [resumeData, setResumeData] = useState({
    fullName: "",
    email: "",
    phone: "",
    education: "",
    experience: [{ company: "", position: "" }],
    skills: "",
  });

  // Simple logout clears login flag and navigates home
  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/");
  };

  return (
    <div className="app container">
      <button className="remove-btn" onClick={handleLogout}>Logout</button>
      <h1>Your Resume Builder</h1>
      <div className="container" style={{ display: "flex", gap: "40px" }}>
        <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
        <ResumePreview resumeData={resumeData} />
      </div>
    </div>
  );
}
