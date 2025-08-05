
/**
 * Validate resume form data
 * @param {Object} data - The form data to validate
 * @returns {Object} errors - Key-value pairs of errors; empty if valid
 */
export default function validate(data) {
  const errors = {};

  // Validate Full Name - required, min 3 chars
  if (!data.fullName || data.fullName.trim().length < 3) {
    errors.fullName = "Full Name is required and should be at least 3 characters.";
  }

  // Validate Email - optional but if provided must be valid format
  if (data.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  // Validate Phone - optional but if provided must be numbers and 10+ digits
if (!data.phone) {
    errors.phone = "Phone number is required.";
  } else if (!/^\d{10}$/.test(data.phone)) {
    errors.phone = "Phone number must be exactly 10 digits.";
  }

  // Validate Education - optional but if provided must not be only spaces
  if (data.education && data.education.trim().length === 0) {
    errors.education = "Education field cannot be empty if provided.";
  }

  // Validate Experience - must have company and position on each entry
  if (!Array.isArray(data.experience)) {
    errors.experience = "Experience must be an array.";
  } else {
    data.experience.forEach((exp, index) => {
      if (!exp.company || exp.company.trim() === "") {
        errors[`experience_${index}_company`] = "Company name is required.";
      }
      if (!exp.position || exp.position.trim() === "") {
        errors[`experience_${index}_position`] = "Position is required.";
      }
    });
  }

  // Skills - optional, but if present should not be all empty spaces
  if (data.skills && data.skills.trim().length === 0) {
    errors.skills = "Skills field cannot be empty if provided.";
  }

  return errors;
}
