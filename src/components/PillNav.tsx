import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function PillNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-6 z-[100] w-full px-6 flex justify-end md:justify-center pointer-events-none">
      {/* Desktop Menu: Centralized Pill (md+) */}
      <div className="hidden md:flex items-center gap-1 bg-[#131314]/80 backdrop-blur-xl border border-white/10 p-1.5 rounded-full shadow-2xl pointer-events-auto">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-white/60 hover:text-white hover:bg-[#e85a2d] px-5 py-2 rounded-full transition-all duration-300 text-[10px] uppercase tracking-[0.2em] font-bold"
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Mobile Menu: Hamburger in Right Corner */}
      <div className="md:hidden pointer-events-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#131314] border border-white/10 p-4 rounded-full text-white shadow-xl flex items-center justify-center hover:border-[#e85a2d]/50 active:scale-90 transition-all"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Dropdown Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Clickable backdrop to close menu */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm -z-10 h-screen w-screen"
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                className="absolute top-20 right-0 w-[250px] bg-[#131314] border border-white/10 rounded-[2.5rem] p-6 shadow-2xl"
              >
                <div className="flex flex-col gap-3">
                  {navItems.map((item, i) => (
                    <motion.a
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-white/80 hover:text-white hover:bg-[#e85a2d] px-6 py-4 rounded-[1.5rem] text-xs uppercase tracking-[0.2em] font-black transition-all border border-transparent hover:border-white/10"
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}