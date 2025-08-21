import React, { useState } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setStatus("Sending...");

    emailjs
      .send(
        "service_lid318p",   // Replace with your EmailJS service ID
        "template_p993lif",  // Replace with your EmailJS template ID
        formData,
        "gnH4dFPsU-IGVZeAb"   // Replace with your EmailJS public key
      )
      .then(
        () => {
          setStatus("✅ Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error("FAILED...", error);
          setStatus("❌ Failed to send. Try again later.");
        }
      );
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">Contact Us</h1>
        <p className="mt-3 text-gray-600 text-lg">
          Have questions, feedback, or partnership ideas? We’d love to hear from you.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <form
          className="bg-white shadow-md rounded-2xl p-6 space-y-5"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
              className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Type your message..."
              className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 text-white font-medium py-2 rounded-lg shadow hover:bg-sky-700 transition"
          >
            Send Message
          </button>

          {status && <p className="text-center mt-3 text-gray-700">{status}</p>}
        </form>

        {/* Contact Info */}
        <div className="bg-gray-50 rounded-2xl p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-semibold">Get in Touch</h2>
          <p className="text-gray-600">
            Our team usually replies within 24 hours. You can also reach us directly through the
            following channels:
          </p>

          <ul className="space-y-3">
            <li>
              📧 <span className="font-medium">Email:</span> jaiswalabhi758@gmail.com
            </li>
            <li>
              📞 <span className="font-medium">Phone:</span> +91 9690472694
            </li>
            <li>
              📍 <span className="font-medium">Address:</span> Bareilly, Uttar Pradesh, India
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Contact;
