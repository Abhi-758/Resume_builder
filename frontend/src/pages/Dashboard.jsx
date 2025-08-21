import React, { useRef, useState } from "react";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoggedin } from "../redux/reducers/UserReducer";
import { LogOut, FileText } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resumeRef = useRef(null);

  const [resumeData, setResumeData] = useState({
    fullName: "",
    email: "",
    phone: "",
    education: "",
    experience: [{ company: "", position: "" }],
    skills: "",
  });

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
    <div className="min-h-screen bg-gray-950 text-gray-200 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-900 border-r border-gray-800 flex flex-col p-6">
        <div className="flex items-center gap-2 mb-8">
          <FileText className="w-6 h-6 text-indigo-400" />
          <h1 className="text-lg font-bold tracking-wide">Resume Builder</h1>
        </div>
        <nav className="flex-1 space-y-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full text-left px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
          >
            Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Fill Your Details
            </h2>
            <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
          </div>

          {/* Preview */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Live Preview
            </h2>
            <div className="bg-gray-800 rounded-xl p-4 overflow-auto max-h-[80vh]">
              <ResumePreview ref={resumeRef} resumeData={resumeData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
