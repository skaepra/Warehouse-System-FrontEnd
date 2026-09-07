import React, { useState } from "react";
import { 
  IoMailOutline, 
  IoCallOutline, 
  IoLocationOutline, 
  IoTimeOutline,
  IoSend,
  IoCheckmarkCircle,
} from "react-icons/io5";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    if (formData.name && formData.email && formData.message) {
      setIsSubmitted(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-200 transition-colors duration-200 pb-12 pt-20 px-6 xl:px-0">
      <div className="mx-auto max-w-5xl space-y-12">
        
        {/* Page Header */}
        <div className="text-center space-y-4">
         
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Get in <span className=" text-indigo-500 dark:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text dark:text-transparent">Touch</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Have a question, feedback, or need assistance with your order? Our team is here to help you.
          </p>
        </div>

        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 border border-gray-200 dark:border-zinc-800 rounded-xl bg-gray-50 dark:bg-zinc-800/50 space-y-3">
            <IoMailOutline className="text-2xl text-indigo-500" />
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Email Us</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">Our team usually replies within 24 hours.</p>
            <a href="mailto:support@store.com" className="text-xs font-semibold text-indigo-500 hover:underline block">
              support@store.com
            </a>
          </div>

          <div className="p-5 border border-gray-200 dark:border-zinc-800 rounded-xl bg-gray-50 dark:bg-zinc-800/50 space-y-3">
            <IoCallOutline className="text-2xl text-indigo-500" />
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Call Us</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">Mon - Fri from 9am to 6pm.</p>
            <a href="tel:+1234567890" className="text-xs font-semibold text-indigo-500 hover:underline block">
              +1 (234) 567-890
            </a>
          </div>

          <div className="p-5 border border-gray-200 dark:border-zinc-800 rounded-xl bg-gray-50 dark:bg-zinc-800/50 space-y-3">
            <IoLocationOutline className="text-2xl text-indigo-500" />
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Headquarters</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">123 Tech Avenue, Suite 400</p>
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">
              New York, NY 10001
            </span>
          </div>

          <div className="p-5 border border-gray-200 dark:border-zinc-800 rounded-xl bg-gray-50 dark:bg-zinc-800/50 space-y-3">
            <IoTimeOutline className="text-2xl text-indigo-500" />
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Working Hours</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">Sunday - Thursday</p>
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">
              08:00 AM - 05:00 PM
            </span>
          </div>
        </div>

        {/* Main Section: Form & Additional Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Contact Form */}
          <div className="lg:col-span-7 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 bg-white dark:bg-zinc-900">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Send Us a Message
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-6">
              Fill out the form below and we’ll get back to you as soon as possible.
            </p>

            {isSubmitted ? (
              <div className="p-6 border border-emerald-200 dark:border-emerald-900/50 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 text-center space-y-3">
                <IoCheckmarkCircle className="text-4xl text-emerald-500 mx-auto" />
                <h3 className="font-bold text-base text-gray-900 dark:text-white">Thank You!</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 max-w-sm mx-auto">
                  Your message has been sent successfully. Our support team will reach out to you shorty.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-2 text-xs font-semibold text-indigo-500 hover:underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm dark:text-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm dark:text-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm dark:text-white transition-all"
                  >
                    <option value="">Select a topic</option>
                    <option value="order">Order Inquiry / Tracking</option>
                    <option value="returns">Returns & Refunds</option>
                    <option value="product">Product Info</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm dark:text-white transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto py-2.5 px-6 text-sm font-semibold text-white  bg-indigo-500 dark:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow hover:scale-[1.02] active:scale-95 duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  <IoSend className="text-xs" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Side: Map & Quick FAQ notice */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Embedded Map Visual Box */}
            <div className="border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-gray-100 dark:bg-zinc-800 h-64 relative flex items-center justify-center text-center p-6">
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215707164416!2d-73.98784412342544!3d40.75797473483935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                className="absolute inset-0 w-full h-full border-0 dark:grayscale dark:opacity-80 
                 dark:hover:opacity-100 dark:hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              ></iframe>
            </div>

            {/* Quick Answer Prompt */}
            <div className="p-6 border border-gray-200 dark:border-zinc-800 rounded-2xl bg-gray-50 dark:bg-zinc-800/40 space-y-3">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                Looking for quick answers?
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Before sending us a message, check out our FAQ section to see if your question is already answered.
              </p>
              <a
                href="/faq"
                className="inline-block text-xs font-semibold text-indigo-500 hover:underline"
              >
                Visit FAQ & Help Center →
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}