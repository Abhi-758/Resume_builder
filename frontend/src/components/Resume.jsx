import React from "react";
import { useNavigate } from "react-router-dom";

const Resume = () => {
  const navigate = useNavigate();
  const dataString = sessionStorage.getItem("resumeData");
  if (!dataString) {
    // If no data, redirect to home
    navigate("/");
    return null;
  }
  const resumeData = JSON.parse(dataString);

  return (
    <div className="app container resume-preview">
      <h1>Resume Preview</h1>
      <div>
        <h2>{resumeData.fullName}</h2>
        {resumeData.email && (
          <p>
            <strong>Email: </strong>
            {resumeData.email}
          </p>
        )}
        {resumeData.phone && (
          <p>
            <strong>Phone: </strong>
            {resumeData.phone}
          </p>
        )}
      </div>

      {resumeData.education && (
        <>
          <h3>Education</h3>
          <p>{resumeData.education}</p>
        </>
      )}

      {resumeData.experience.length > 0 && (
        <>
          <h3>Work Experience</h3>
          <ul>
            {resumeData.experience.map((exp, i) => (
              <li key={i}>
                <strong>{exp.position}</strong> at {exp.company}
              </li>
            ))}
          </ul>
        </>
      )}

      {resumeData.skills && (
        <>
          <h3>Skills</h3>
          <p>{resumeData.skills}</p>
        </>
      )}

      <button onClick={() => navigate("/")}>Edit Resume</button>
    </div>
  );
};

export default Resume;
