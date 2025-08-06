import React from "react";
import resumeSchema from "../schemas/resumeSchema";

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

  return (
    <form className="resume-form" onSubmit={(e) => e.preventDefault()}>
      <label className="resume-form__label">
        Full Name
        <input
          name="fullName"
          className="resume-form__input"
          value={resumeData.fullName}
          onChange={handleChange}
          required
        />
      </label>

      <label className="resume-form__label">
        Email
        <input
          type="email"
          name="email"
          className="resume-form__input"
          value={resumeData.email}
          onChange={handleChange}
          required
        />
      </label>

      <label className="resume-form__label">
        Phone
        <input
          type="tel"
          name="phone"
          className="resume-form__input"
          value={resumeData.phone}
          onChange={handleChange}
          required
          minLength={1}
          maxLength={10}
        />
      </label>

      <label className="resume-form__label">
        Education
        <textarea
          name="education"
          className="resume-form__textarea"
          value={resumeData.education}
          onChange={handleChange}
          rows={3}
        />
      </label>

      <fieldset className="experience-section">
        <legend>Work Experience</legend>
        {resumeData.experience.length > 0 &&
          resumeData.experience.map((exp, idx) => (
            <div key={idx} className="experience-section__entry">
              <label className="experience-section__label">
                Company:
                <input
                  name="company"
                  className="resume-form__input"
                  value={exp.company}
                  onChange={e => handleChange(e,idx)}
                />
              </label>

              <label className="experience-section__label">
                Position:
                <input
                  name="position"
                  className="resume-form__input"
                  value={exp.position}
                  onChange={e => handleChange(e,idx)}
                />
              </label>

              {resumeData.experience.length > 1 && (
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeExperience(idx)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        <button type="button" className="add-btn" onClick={addExperience}>
          Add Experience
        </button>
      </fieldset>

      <label className="resume-form__label">
        Skills (comma separated)
        <textarea
          name="skills"
          className="resume-form__textarea"
          value={resumeData.skills}
          onChange={handleChange}
          rows={2}
        />
      </label>
    </form>
  );
}
