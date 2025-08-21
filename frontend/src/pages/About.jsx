import React from "react";

export default function About() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          Build a professional resume in minutes — smart templates, real-time previews, 
          and export-ready PDFs. We help students and professionals make their best first impression.
        </p>
      </header>

      {/* Who we are */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Who We Are</h2>
        <p className="text-gray-700 leading-relaxed">
          We are a passionate team of designers, developers, and career experts 
          committed to simplifying the resume-building process. Our goal is to empower 
          job seekers with modern, ATS-friendly resumes that showcase skills and achievements 
          effectively.
        </p>
      </section>

      {/* What we do */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">What We Do</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "ATS-friendly templates",
            "Real-time preview & print-ready PDF",
            "Skill & keyword suggestions",
            "Shareable public resume link",
            "Templates for students & professionals",
            "Guided resume-building experience",
          ].map((feature, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl shadow-sm"
            >
              <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-bold">
                ✓
              </span>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Why it matters */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Why It Matters</h2>
        <p className="text-gray-700 leading-relaxed">
          A strong resume is your first step toward career success. By combining 
          industry best practices with clean design, our tool helps you stand out 
          to recruiters and increase your chances of landing interviews.
        </p>
      </section>

      {/* Commitments */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Our Commitments</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Privacy: Your data is yours — we never sell personal information.</li>
          <li>Accessibility: Readable fonts & screen-reader friendly design.</li>
          <li>Continuous improvement based on user feedback & hiring trends.</li>
        </ul>
      </section>

      {/* Testimonials */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">What Users Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { quote: "Got interviews within 2 weeks — thanks!", who: "— Priya, Student" },
            { quote: "Simple, fast and ATS-safe.", who: "— Rohit, Developer" },
          ].map((t, i) => (
            <blockquote key={i} className="p-5 bg-gray-50 rounded-xl shadow-sm">
              <p className="text-gray-800 italic">“{t.quote}”</p>
              <footer className="mt-2 text-sm text-gray-600">{t.who}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center mt-12">
        <a
          href="/create"
          className="inline-block px-6 py-3 rounded-2xl bg-sky-600 text-white font-medium shadow hover:bg-sky-700 transition"
        >
          Create Your Resume — It’s Free
        </a>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ResumeCraft. All rights reserved.
      </footer>
    </main>
  );
}
