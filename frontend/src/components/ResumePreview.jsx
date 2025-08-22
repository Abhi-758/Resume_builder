import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function ResumePreview({ resumeData  }) {
  const resumeRef = useRef(null);

  console.log(resumeData)

  // Print handler
  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: resumeData.fullName || "Resume",
  });

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  // Split skills & languages into arrays
  const skillsArray = resumeData.skills
    ? resumeData.skills.split(",").map((skill) => skill.trim()).filter(Boolean)
    : [];

  const languagesArray = resumeData.languages
    ? resumeData.languages.split(",").map((lang) => lang.trim()).filter(Boolean)
    : [];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Resume Preview */}
      <div ref={resumeRef} className="bg-white text-gray-900 p-8 shadow-lg">
        {/* Header */}
        <header className="text-center border-b-2 border-gray-200 pb-6 mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {resumeData.fullName || "Your Name"}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-gray-600">
            {resumeData.email && <span>{resumeData.email}</span>}
            {resumeData.phone && <span>{resumeData.phone}</span>}
            {resumeData.location && <span>{resumeData.location}</span>}
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-blue-600 mt-2">
            {resumeData.linkedin && (
              <a href={resumeData.linkedin} className="hover:underline">
                LinkedIn
              </a>
            )}
            {resumeData.github && (
              <a href={resumeData.github} className="hover:underline">
                GitHub
              </a>
            )}
          </div>
        </header>

        {/* Professional Summary */}
        {resumeData.summary && (
          <section className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {Array.isArray(resumeData.experience) &&
          resumeData.experience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
                Work Experience
              </h2>
              {resumeData.experience.map((exp, idx) => (
                <div key={idx} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {exp.position || "Position"}
                      </h3>
                      <p className="text-lg text-blue-600 font-medium">
                        {exp.company || "Company"}
                      </p>
                    </div>
                    <div className="text-right text-gray-600">
                      <p>
                        {formatDate(exp.startDate)} -{" "}
                        {exp.currentJob ? "Present" : formatDate(exp.endDate)}
                      </p>
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed ml-4">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

        {/* Education */}
        {Array.isArray(resumeData.education) &&
          resumeData.education.length > 0 && (
            <section className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
                Education
              </h2>
              {resumeData.education.map((edu, idx) => (
                <div key={idx} className="mb-4 last:mb-0">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {edu.degree || "Degree"}
                  </h3>
                  <p className="text-blue-600 font-medium">{edu.institution}</p>
                  <p className="text-gray-600">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                </div>
              ))}
            </section>
          )}

        {/* Projects */}
        {Array.isArray(resumeData.projects) &&
          resumeData.projects.length > 0 && (
            <section className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
                Projects
              </h2>
              {resumeData.projects.map((project, idx) => (
                <div key={idx} className="mb-4 last:mb-0">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {project.url ? (
                      <a
                        href={project.url}
                        className="text-blue-600 hover:underline"
                      >
                        {project.name || "Project Name"}
                      </a>
                    ) : (
                      project.name || "Project Name"
                    )}
                  </h3>
                  {project.technologies && (
                    <p className="text-gray-600 font-medium">
                      {project.technologies}
                    </p>
                  )}
                  {project.description && (
                    <p className="text-gray-700 leading-relaxed ml-4">
                      {project.description}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

        {/* Skills */}
        {skillsArray.length > 0 && (
          <section className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
              Technical Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skillsArray.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {Array.isArray(resumeData.certifications) &&
          resumeData.certifications.length > 0 && (
            <section className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
                Certifications
              </h2>
              {resumeData.certifications.map((cert, idx) => (
                <div key={idx} className="mb-3 last:mb-0">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {cert.name || "Certification"}
                  </h3>
                  <p className="text-blue-600 font-medium">{cert.issuer}</p>
                  <p className="text-gray-600 text-sm">
                    {formatDate(cert.issueDate)}
                    {cert.expiryDate &&
                      ` - Expires: ${formatDate(cert.expiryDate)}`}
                  </p>
                </div>
              ))}
            </section>
          )}

        {/* Languages */}
        {languagesArray.length > 0 && (
          <section className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
              Languages
            </h2>
            <div className="flex flex-wrap gap-4">
              {languagesArray.map((language, idx) => (
                <span key={idx} className="text-gray-700 font-medium">
                  {language}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Print Button */}
      <div className="text-center mt-8 print:hidden">
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Print Resume
        </button>
      </div>
    </div>
  );
}










































// import React from "react";
// import "./ResumePreview.css";
// import { useReactToPrint } from "react-to-print";

// const ResumePreview = React.forwardRef(({ resumeData }, ref) => {
//   const reactToPrintFn = useReactToPrint({ contentRef: ref });

//   return (
//  <>
 
//     <div ref={ref} className="resume-preview-container">
//       <h2 className="resume-name">{resumeData.fullName || "Your Name"}</h2>

//       {resumeData.email && <p><strong>Email:</strong> {resumeData.email}</p>}
//       {resumeData.phone && <p><strong>Phone:</strong> {resumeData.phone}</p>}

//       {resumeData.education && (
//         <>
//           <h3>Education</h3>
//           <p>{resumeData.education}</p>
//         </>
//       )}

//       {resumeData.experience.length > 0 && (
//         <>
//           <h3>Work Experience</h3>
//           <ul>
//             {resumeData.experience.map((exp, i) => (
//               <li key={i}>
//                 <strong>{exp.position}</strong> at {exp.company}
//               </li>
//             ))}
//           </ul>
//         </>
//       )}

//       {resumeData.skills && (
//         <>
//           <h3>Skills</h3>
//           <p>{resumeData.skills}</p>
//         </>
//       )}

      
//     </div>

//      <button style={{width: "100px", height: "45px"}} onClick={reactToPrintFn}>Print</button>
 
//  </>   

//   );
// });

// export default ResumePreview;
