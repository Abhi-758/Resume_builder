import React from "react";

export default function ResumeForm({ resumeData, setResumeData }) {
  const handleChange = (e, idx = null) => {
    const { name, value } = e.target;

    if (["company", "position"].includes(name) && idx !== null) {
      const updatedExperience = [...resumeData.experience];
      updatedExperience[idx] = {
        ...updatedExperience[idx],
        [name]: value,
      };
      setResumeData((prev) => ({
        ...prev,
        experience: updatedExperience,
      }));
    } else {
      setResumeData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, { company: "", position: "" }],
    });
  };

  const removeExperience = (idx) => {
    if (resumeData.experience.length === 1) return; // Keep at least one
    const newExp = resumeData.experience.filter((_, i) => i !== idx);
    setResumeData({ ...resumeData, experience: newExp });
  };

  const inputClasses =
    "w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 " +
    "text-gray-200 placeholder-gray-400 focus:outline-none " +
    "focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500";

  return (
    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Full Name
        </label>
        <input
          name="fullName"
          className={inputClasses}
          value={resumeData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          className={inputClasses}
          value={resumeData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Phone
        </label>
        <input
          type="tel"
          name="phone"
          className={inputClasses}
          value={resumeData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          required
          minLength={1}
          maxLength={10}
        />
      </div>

      {/* Education */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Education
        </label>
        <textarea
          name="education"
          className={inputClasses}
          value={resumeData.education}
          onChange={handleChange}
          rows={3}
          placeholder="Add your education details"
        />
      </div>

      {/* Work Experience */}
      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-gray-200 mb-2">
          Work Experience
        </legend>
        {resumeData.experience.length > 0 &&
          resumeData.experience.map((exp, idx) => (
            <div
              key={idx}
              className="space-y-2 rounded-lg border border-gray-700 p-4 bg-gray-800"
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Company
                </label>
                <input
                  name="company"
                  className={inputClasses}
                  value={exp.company}
                  onChange={(e) => handleChange(e, idx)}
                  placeholder="Company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Position
                </label>
                <input
                  name="position"
                  className={inputClasses}
                  value={exp.position}
                  onChange={(e) => handleChange(e, idx)}
                  placeholder="Job title / position"
                />
              </div>

              {resumeData.experience.length > 1 && (
                <button
                  type="button"
                  className="mt-2 text-sm text-red-400 hover:text-red-300 transition"
                  onClick={() => removeExperience(idx)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

        <button
          type="button"
          className="mt-2 px-4 py-2 rounded-lg bg-indigo-600 text-white 
                     hover:bg-indigo-500 transition"
          onClick={addExperience}
        >
          + Add Experience
        </button>
      </fieldset>

      {/* Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Skills (comma separated)
        </label>
        <textarea
          name="skills"
          className={inputClasses}
          value={resumeData.skills}
          onChange={handleChange}
          rows={2}
          placeholder="e.g. React, Node.js, Tailwind"
        />
      </div>
    </form>
  );
}
