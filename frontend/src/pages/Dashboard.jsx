import React, { useRef, useState } from "react";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoggedin } from "../redux/reducers/UserReducer";
import {useReactToPrint} from "react-to-print";

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

  let dispatch = useDispatch();

  let resumeRef = useRef(null)

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/users/logout", {
        withCredentials: true,
      });
      toast.success("Logout Success");
      dispatch(setLoggedin(false));
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="app container">
      <button className="remove-btn" onClick={handleLogout}>
        Logout
      </button>
      <h1>Your Resume Builder</h1>
      <div className="container" style={{ display: "flex", gap: "40px" }}>
        <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />

        
        
          <ResumePreview ref={resumeRef}  resumeData={resumeData} />
        

        
      </div>
    </div>
  );
}
