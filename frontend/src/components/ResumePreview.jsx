import React from "react";

export default function ResumePreview({ resumeData }) {
  return (
    <div className="resume-preview">
      <h2>{resumeData.fullName || "Your Name"}</h2>
      {resumeData.email && (
        <p><strong>Email:</strong> {resumeData.email}</p>
      )}
      {resumeData.phone && (
        <p><strong>Phone:</strong> {resumeData.phone}</p>
      )}

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
    </div>
  );
}
