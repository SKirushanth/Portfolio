import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github, Send, MessageSquare } from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert("Message sent successfully!");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="bg-[#0a0a0a] py-16 md:py-24 px-5 relative overflow-hidden">
      {/* Glow effect - centered for mobile */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-75 bg-[#e85a2d]/10 rounded-full blur-[100px] pointer-events-none opacity-50 md:opacity-100" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Top/Left: Info Header */}
          <div className="text-center lg:text-left">
            <span className="text-[#e85a2d] font-bold text-[10px] md:text-xs uppercase tracking-[0.3em] mb-3 block">
              Get in Touch
            </span>
            <h2 className="text-[12vw] sm:text-5xl md:text-7xl font-bold text-white tracking-tighter leading-[0.9] mb-6">
              LET'S START A <br />
              <span className="text-[#e85a2d] italic">PROJECT</span>
            </h2>
            <p className="text-neutral-400 text-sm md:text-lg mb-8 lg:mb-12 max-w-md mx-auto lg:mx-0 leading-relaxed">
              I’m available for freelance and full-time opportunities. Drop a message!
            </p>

            {/* Contact Details - Stacked for Mobile */}
            <div className="flex flex-col items-center lg:items-start gap-4 md:gap-6">
              <a href="mailto:hello@yourdomain.com" className="flex items-center gap-3 md:gap-4 group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#131314] flex items-center justify-center border border-white/5">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 text-[#e85a2d]" />
                </div>
                <span className="text-white text-sm md:text-base font-medium">kirushanth.20233050@iit.ac.lk</span>
              </a>
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#131314] flex items-center justify-center border border-white/5">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 text-[#e85a2d]" />
                </div>
                <span className="text-white text-sm md:text-base font-medium">+94 70 139 6579</span>
              </div>
            </div>

            {/* Social Icons - Centered for Mobile */}
            <div className="flex justify-center lg:justify-start gap-3 mt-10">
              {[
                { Icon: Linkedin, href: "https://www.linkedin.com/in/kirushanth-sathiyaseelan" },
                { Icon: Github, href: "https://github.com/SKirushanth?tab=repositories" },
                { Icon: MessageSquare, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-[#131314] border border-white/5 flex items-center justify-center text-neutral-400"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Bottom/Right: Form Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#131314] p-6 sm:p-10 md:p-12 rounded-4xl md:rounded-[2.5rem] border border-white/5 shadow-2xl mt-4 lg:mt-0"
          >
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] md:text-[10px] uppercase tracking-widest text-neutral-500 font-bold ml-1">Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Your Name"
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 md:py-4 text-white focus:outline-none focus:border-[#e85a2d] transition-all text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] md:text-[10px] uppercase tracking-widest text-neutral-500 font-bold ml-1">Email</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="Email"
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 md:py-4 text-white focus:outline-none focus:border-[#e85a2d] transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] md:text-[10px] uppercase tracking-widest text-neutral-500 font-bold ml-1">Message</label>
                <textarea 
                  rows={4} 
                  required 
                  placeholder="Tell me about your project..."
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 md:py-4 text-white focus:outline-none focus:border-[#e85a2d] transition-all text-sm resize-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#e85a2d] text-black font-bold py-4 md:py-5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#ff6b3d] transition-all active:scale-[0.96] text-sm md:text-base"
              >
                {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}