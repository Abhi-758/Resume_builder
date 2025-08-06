import {z} from 'zod'

const resumeSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required").max(10,"Phone number should be atmost 10 digits"),
    education: z.string().min(1, "Education is required"),
    experience: z.array(
        z.object({
            company: z.string().min(1, "Company is required"),
            position: z.string().min(1, "Position is required"),
        })
    ),
    skills: z.string().min(1, "Skills are required"),
});

export default resumeSchema