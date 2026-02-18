export default function Hero() {
  return (
    <section className="p-4">
      <div className="bg-gradient-to-br from-[#f97316] to-[#dc2626] rounded-bento p-8 md:p-16 relative overflow-hidden">
        {/* Navbar */}
        <nav className="flex justify-between items-center mb-24">
          <span className="font-bold text-2xl tracking-tighter">Foliobiax</span>
          <div className="hidden md:flex gap-10 text-sm font-medium uppercase tracking-widest">
            <a href="#home" className="hover:opacity-70 transition">Home</a>
            <a href="#about" className="hover:opacity-70 transition">About</a>
            <a href="#projects" className="hover:opacity-70 transition">Projects</a>
          </div>
          <button className="bg-white text-black px-8 py-3 rounded-full font-bold text-sm flex items-center gap-2">
            Get in touch <span className="text-orange-500">→</span>
          </button>
        </nav>

        {/* Content */}
        <div className="max-w-5xl">
          <p className="text-xl font-medium mb-4">Hey, I'm a</p>
          <h1 className="text-7xl md:text-9xl font-bold leading-[0.9] tracking-tighter mb-12">
            Creative <br /> Director
          </h1>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/20">
            <div><p className="text-xs opacity-70 mb-1">#01</p><p className="font-bold text-lg">Brand Strategy</p></div>
            <div><p className="text-xs opacity-70 mb-1">#02</p><p className="font-bold text-lg">Brand Identity</p></div>
            <div><p className="text-xs opacity-70 mb-1">#03</p><p className="font-bold text-lg">Packaging</p></div>
            <div><p className="text-xs opacity-70 mb-1">#04</p><p className="font-bold text-lg">Web Design</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}