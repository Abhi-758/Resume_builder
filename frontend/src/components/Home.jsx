import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";


const Home = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState([{ company: "", position: "" }]);
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddExperience = () => {
    setExperience([...experience, { company: "", position: "" }]);
  };

  const handleRemoveExperience = (index) => {
    const list = [...experience];
    list.splice(index, 1);
    setExperience(list);
  };

  const handleExperienceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...experience];
    list[index][name] = value;
    setExperience(list);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      alert("Please enter your full name");
      return;
    }
    setLoading(true);

    // Simulate async for demo - in real app may call backend or do more processing
    setTimeout(() => {
      // Save form data to sessionStorage to share with Resume page
      const resumeData = {
        fullName,
        email,
        phone,
        education,
        experience,
        skills,
      };
      sessionStorage.setItem("resumeData", JSON.stringify(resumeData));
      setLoading(false);
      navigate("/resume");
    }, 1500);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="app container">
      <h1>Resume Builder</h1>
      <form className="resume-form" onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label>
          Education:
          <textarea
            name="education"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            rows="3"
          />
        </label>

        <fieldset className="experience-section">
          <legend>Work Experience</legend>
          {experience.map((exp, index) => (
            <div key={index} className="experience-entry">
              <label>
                Company:
                <input
                  type="text"
                  name="company"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(e, index)}
                  required
                />
              </label>
              <label>
                Position:
                <input
                  type="text"
                  name="position"
                  value={exp.position}
                  onChange={(e) => handleExperienceChange(e, index)}
                  required
                />
              </label>
              {experience.length > 1 && (
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => handleRemoveExperience(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {experience.length < 5 && (
            <button
              type="button"
              className="add-btn"
              onClick={handleAddExperience}
            >
              Add Experience
            </button>
          )}
        </fieldset>

        <label>
          Skills (comma separated):
          <textarea
            name="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            rows="2"
          />
        </label>

        <button type="submit" className="submit-btn">
          Generate Resume
        </button>
      </form>
    </div>
  );
};

export default Home;
