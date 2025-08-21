import React, { useEffect, useState } from "react";
import {
  FileText,
  Zap,
  Download,
  Eye,
  Star,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Globe,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoggedin } from "../redux/reducers/UserReducer";

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate()
  // let dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(setLoggedin(false))
  // },[])

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-blue-400" />,
      title: "AI-Powered Builder",
      description:
        "Smart suggestions and content optimization powered by advanced AI to make your resume stand out.",
    },
    {
      icon: <Eye className="w-8 h-8 text-blue-400" />,
      title: "Live Preview",
      description:
        "See your changes in real-time with our interactive preview that shows exactly how recruiters will see your resume.",
    },
    {
      icon: <Download className="w-8 h-8 text-blue-400" />,
      title: "Multiple Formats",
      description:
        "Export your resume in PDF, Word, or plain text formats optimized for ATS systems.",
    },
    {
      icon: <Globe className="w-8 h-8 text-blue-400" />,
      title: "Global Templates",
      description:
        "Choose from professionally designed templates that work worldwide and across industries.",
    },
  ];

  const steps = [
    { number: "01", title: "Choose Template", description: "Select from our collection of ATS-friendly, professionally designed templates." },
    { number: "02", title: "Add Your Info", description: "Fill in your details with our guided form and AI-powered content suggestions." },
    { number: "03", title: "Customize & Perfect", description: "Fine-tune the design, layout, and content to match your personal brand." },
    { number: "04", title: "Download & Apply", description: "Export your polished resume and start applying to your dream jobs." },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "Google",
      content:
        "This resume builder helped me land my dream job! The AI suggestions were spot-on and the templates look incredibly professional.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Marketing Manager",
      company: "Meta",
      content:
        "The live preview feature saved me hours of formatting. I got 3x more interview calls after using this platform.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Data Scientist",
      company: "Netflix",
      content:
        "Clean, modern templates that actually pass ATS systems. The export quality is exceptional.",
      rating: 5,
    },
  ];

  const stats = [
    { number: "500K+", label: "Resumes Created" },
    { number: "95%", label: "Success Rate" },
    { number: "50+", label: "Templates" },
    { number: "4.9/5", label: "User Rating" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="bg-slate-950/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center h-16 px-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <FileText className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold">ResumeAI</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {["Features", "Templates", "Pricing", "About"].map((item, i) => (
              <a
                key={i}
                href={`#${item.toLowerCase()}`}
                className="text-slate-300 hover:text-white transition"
              >
                {item}
              </a>
            ))}
            <button className="text-slate-300 hover:text-white transition">
              Sign In
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl transition">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Btn */}
          <div className="">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-300 hover:text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-4">
            <div className="flex flex-col gap-4">
              {["Features", "Templates", "Pricing", "About"].map((item, i) => (
                <a
                  key={i}
                  href={`#${item.toLowerCase()}`}
                  className="text-slate-300 hover:text-white transition"
                >
                  {item}
                </a>
              ))}
              <button className="text-slate-300 hover:text-white text-left">
                Sign In
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl transition">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800/40 to-purple-800/40"></div>
        <div className="relative container mx-auto px-4 pt-20 pb-32 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Build Your Perfect Resume
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Create professional, ATS-friendly resumes with our AI-powered builder. Land more interviews with templates designed by hiring experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('/register')} className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-lg font-semibold transition transform hover:scale-105 flex items-center gap-2">
              <span>Start Building Free</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border border-slate-600 hover:border-slate-500 px-8 py-4 rounded-xl text-lg font-semibold transition">
              View Templates
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">{stat.number}</div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose ResumeAI?</h2>
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
            Our advanced features help you create resumes that get noticed by both ATS systems and human recruiters.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-slate-800 p-8 rounded-xl hover:bg-slate-700 transition transform hover:translate-y-[-0.5rem] shadow-lg"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
