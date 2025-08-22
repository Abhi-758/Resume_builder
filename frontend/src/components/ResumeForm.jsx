import React from "react";

export default function ResumeForm({ resumeData, setResumeData }) {
  // Handle input changes safely
  const handleChange = (e, section = null, idx = null) => {
    const { name, value } = e.target;

    if (section && idx !== null) {
      const updatedSection = [...resumeData[section]];
      updatedSection[idx] = { ...updatedSection[idx], [name]: value };
      setResumeData((prev) => ({ ...prev, [section]: updatedSection }));
    } else {
      setResumeData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Add new item in array sections
  const addItem = (section, defaultItem) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], defaultItem],
    }));
  };

  // Remove item from array sections
  const removeItem = (section, idx) => {
    if (resumeData[section].length === 1) return;
    const newItems = resumeData[section].filter((_, i) => i !== idx);
    setResumeData((prev) => ({ ...prev, [section]: newItems }));
  };

  const inputClasses =
    "w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-gray-200 " +
    "placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500";

  const textareaClasses = inputClasses + " resize-none";

  return (
    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
      {/* ================= PERSONAL INFO ================= */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-100 border-b border-gray-700 pb-2">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="fullName"
            className={inputClasses}
            value={resumeData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
          />
          <input
            type="email"
            name="email"
            className={inputClasses}
            value={resumeData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="tel"
            name="phone"
            className={inputClasses}
            value={resumeData.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
          <input
            name="location"
            className={inputClasses}
            value={resumeData.location}
            onChange={handleChange}
            placeholder="Location"
          />
          <input
            type="url"
            name="linkedin"
            className={inputClasses}
            value={resumeData.linkedin}
            onChange={handleChange}
            placeholder="LinkedIn"
          />
          <input
            type="url"
            name="github"
            className={inputClasses}
            value={resumeData.github}
            onChange={handleChange}
            placeholder="GitHub"
          />
        </div>
      </section>

      {/* ================= SUMMARY ================= */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-100 border-b border-gray-700 pb-2">
          Professional Summary
        </h3>
        <textarea
          name="summary"
          className={textareaClasses}
          value={resumeData.summary}
          onChange={handleChange}
          rows={4}
          placeholder="Write a short professional summary..."
        />
      </section>

      {/* ================= EXPERIENCE ================= */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-100 border-b border-gray-700 pb-2">
          Work Experience
        </h3>
        {resumeData.experience.map((exp, idx) => (
          <div key={idx} className="space-y-3 rounded-lg border border-gray-700 p-4 bg-gray-800/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                name="company"
                className={inputClasses}
                value={exp.company}
                onChange={(e) => handleChange(e, "experience", idx)}
                placeholder="Company"
              />
              <input
                name="position"
                className={inputClasses}
                value={exp.position}
                onChange={(e) => handleChange(e, "experience", idx)}
                placeholder="Position"
              />
              <input
                type="date"
                name="startDate"
                className={inputClasses}
                value={exp.startDate}
                onChange={(e) => handleChange(e, "experience", idx)}
              />
              <input
                type="date"
                name="endDate"
                className={inputClasses}
                value={exp.endDate}
                onChange={(e) => handleChange(e, "experience", idx)}
              />
            </div>
            <textarea
              name="description"
              className={textareaClasses}
              value={exp.description}
              onChange={(e) => handleChange(e, "experience", idx)}
              rows={3}
              placeholder="Job responsibilities..."
            />
            {resumeData.experience.length > 1 && (
              <button
                type="button"
                className="text-sm text-red-400 hover:text-red-300"
                onClick={() => removeItem("experience", idx)}
              >
                Remove Experience
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition"
          onClick={() =>
            addItem("experience", {
              company: "",
              position: "",
              startDate: "",
              endDate: "",
              description: "",
            })
          }
        >
          + Add Experience
        </button>
      </section>

      {/* ================= EDUCATION ================= */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-100 border-b border-gray-700 pb-2">
          Education
        </h3>
        {resumeData.education.map((edu, idx) => (
          <div key={idx} className="space-y-3 rounded-lg border border-gray-700 p-4 bg-gray-800/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                name="institution"
                className={inputClasses}
                value={edu.institution}
                onChange={(e) => handleChange(e, "education", idx)}
                placeholder="Institution"
              />
              <input
                name="degree"
                className={inputClasses}
                value={edu.degree}
                onChange={(e) => handleChange(e, "education", idx)}
                placeholder="Degree"
              />
              <input
                type="number"
                name="graduationYear"
                className={inputClasses}
                value={edu.graduationYear}
                onChange={(e) => handleChange(e, "education", idx)}
                placeholder="Year"
              />
              <input
                type="text"
                name="gpa"
                className={inputClasses}
                value={edu.gpa}
                onChange={(e) => handleChange(e, "education", idx)}
                placeholder="GPA/Percentage"
              />
            </div>
            {resumeData.education.length > 1 && (
              <button
                type="button"
                className="text-sm text-red-400 hover:text-red-300"
                onClick={() => removeItem("education", idx)}
              >
                Remove Education
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition"
          onClick={() =>
            addItem("education", { institution: "", degree: "", graduationYear: "", gpa: "" })
          }
        >
          + Add Education
        </button>
      </section>

      {/* ================= PROJECTS ================= */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-100 border-b border-gray-700 pb-2">
          Projects
        </h3>
        {resumeData.projects.map((proj, idx) => (
          <div key={idx} className="space-y-3 rounded-lg border border-gray-700 p-4 bg-gray-800/50">
            <input
              name="title"
              className={inputClasses}
              value={proj.title}
              onChange={(e) => handleChange(e, "projects", idx)}
              placeholder="Project Title"
            />
            <textarea
              name="description"
              className={textareaClasses}
              value={proj.description}
              onChange={(e) => handleChange(e, "projects", idx)}
              rows={3}
              placeholder="Project details..."
            />
            <input
              type="url"
              name="link"
              className={inputClasses}
              value={proj.link}
              onChange={(e) => handleChange(e, "projects", idx)}
              placeholder="Project Link (GitHub/Live)"
            />
            {resumeData.projects.length > 1 && (
              <button
                type="button"
                className="text-sm text-red-400 hover:text-red-300"
                onClick={() => removeItem("projects", idx)}
              >
                Remove Project
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition"
          onClick={() => addItem("projects", { title: "", description: "", link: "" })}
        >
          + Add Project
        </button>
      </section>

      {/* ================= CERTIFICATIONS ================= */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-100 border-b border-gray-700 pb-2">
          Certifications
        </h3>
        {resumeData.certifications.map((cert, idx) => (
          <div key={idx} className="space-y-3 rounded-lg border border-gray-700 p-4 bg-gray-800/50">
            <input
              name="title"
              className={inputClasses}
              value={cert.title}
              onChange={(e) => handleChange(e, "certifications", idx)}
              placeholder="Certification Title"
            />
            <input
              name="issuer"
              className={inputClasses}
              value={cert.issuer}
              onChange={(e) => handleChange(e, "certifications", idx)}
              placeholder="Issuing Organization"
            />
            <input
              type="date"
              name="date"
              className={inputClasses}
              value={cert.date}
              onChange={(e) => handleChange(e, "certifications", idx)}
            />
            {resumeData.certifications.length > 1 && (
              <button
                type="button"
                className="text-sm text-red-400 hover:text-red-300"
                onClick={() => removeItem("certifications", idx)}
              >
                Remove Certification
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition"
          onClick={() =>
            addItem("certifications", { title: "", issuer: "", date: "" })
          }
        >
          + Add Certification
        </button>
      </section>

      {/* ================= SKILLS ================= */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-100 border-b border-gray-700 pb-2">
          Skills
        </h3>
        <textarea
          name="skills"
          className={textareaClasses}
          value={resumeData.skills}
          onChange={handleChange}
          rows={3}
          placeholder="e.g. React, Node.js, Tailwind CSS"
        />
      </section>

      {/* ================= LANGUAGES ================= */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-100 border-b border-gray-700 pb-2">
          Languages
        </h3>
        <textarea
          name="languages"
          className={textareaClasses}
          value={resumeData.languages}
          onChange={handleChange}
          rows={2}
          placeholder="English (Fluent), Spanish (Intermediate)"
        />
      </section>
    </form>
  );
}

































































// import React from "react";

// export default function ResumeForm({ resumeData, setResumeData }) {
//   const handleChange = (e, idx = null) => {
//     const { name, value } = e.target;

//     if (["company", "position"].includes(name) && idx !== null) {
//       const updatedExperience = [...resumeData.experience];
//       updatedExperience[idx] = {
//         ...updatedExperience[idx],
//         [name]: value,
//       };
//       setResumeData((prev) => ({
//         ...prev,
//         experience: updatedExperience,
//       }));
//     } else {
//       setResumeData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const addExperience = () => {
//     setResumeData({
//       ...resumeData,
//       experience: [...resumeData.experience, { company: "", position: "" }],
//     });
//   };

//   const removeExperience = (idx) => {
//     if (resumeData.experience.length === 1) return; // Keep at least one
//     const newExp = resumeData.experience.filter((_, i) => i !== idx);
//     setResumeData({ ...resumeData, experience: newExp });
//   };

//   const inputClasses =
//     "w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 " +
//     "text-gray-200 placeholder-gray-400 focus:outline-none " +
//     "focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500";

//   return (
//     <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
//       {/* Full Name */}
//       <div>
//         <label className="block text-sm font-medium text-gray-300 mb-1">
//           Full Name
//         </label>
//         <input
//           name="fullName"
//           className={inputClasses}
//           value={resumeData.fullName}
//           onChange={handleChange}
//           placeholder="Enter your full name"
//           required
//         />
//       </div>

//       {/* Email */}
//       <div>
//         <label className="block text-sm font-medium text-gray-300 mb-1">
//           Email
//         </label>
//         <input
//           type="email"
//           name="email"
//           className={inputClasses}
//           value={resumeData.email}
//           onChange={handleChange}
//           placeholder="Enter your email"
//           required
//         />
//       </div>

//       {/* Phone */}
//       <div>
//         <label className="block text-sm font-medium text-gray-300 mb-1">
//           Phone
//         </label>
//         <input
//           type="tel"
//           name="phone"
//           className={inputClasses}
//           value={resumeData.phone}
//           onChange={handleChange}
//           placeholder="Enter your phone number"
//           required
//           minLength={1}
//           maxLength={10}
//         />
//       </div>

//       {/* Education */}
//       <div>
//         <label className="block text-sm font-medium text-gray-300 mb-1">
//           Education
//         </label>
//         <textarea
//           name="education"
//           className={inputClasses}
//           value={resumeData.education}
//           onChange={handleChange}
//           rows={3}
//           placeholder="Add your education details"
//         />
//       </div>

//       {/* Work Experience */}
//       <fieldset className="space-y-3">
//         <legend className="text-sm font-semibold text-gray-200 mb-2">
//           Work Experience
//         </legend>
//         {resumeData.experience.length > 0 &&
//           resumeData.experience.map((exp, idx) => (
//             <div
//               key={idx}
//               className="space-y-2 rounded-lg border border-gray-700 p-4 bg-gray-800"
//             >
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-1">
//                   Company
//                 </label>
//                 <input
//                   name="company"
//                   className={inputClasses}
//                   value={exp.company}
//                   onChange={(e) => handleChange(e, idx)}
//                   placeholder="Company name"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-1">
//                   Position
//                 </label>
//                 <input
//                   name="position"
//                   className={inputClasses}
//                   value={exp.position}
//                   onChange={(e) => handleChange(e, idx)}
//                   placeholder="Job title / position"
//                 />
//               </div>

//               {resumeData.experience.length > 1 && (
//                 <button
//                   type="button"
//                   className="mt-2 text-sm text-red-400 hover:text-red-300 transition"
//                   onClick={() => removeExperience(idx)}
//                 >
//                   Remove
//                 </button>
//               )}
//             </div>
//           ))}

//         <button
//           type="button"
//           className="mt-2 px-4 py-2 rounded-lg bg-indigo-600 text-white 
//                      hover:bg-indigo-500 transition"
//           onClick={addExperience}
//         >
//           + Add Experience
//         </button>
//       </fieldset>

//       {/* Skills */}
//       <div>
//         <label className="block text-sm font-medium text-gray-300 mb-1">
//           Skills (comma separated)
//         </label>
//         <textarea
//           name="skills"
//           className={inputClasses}
//           value={resumeData.skills}
//           onChange={handleChange}
//           rows={2}
//           placeholder="e.g. React, Node.js, Tailwind"
//         />
//       </div>
//     </form>
//   );
// }
