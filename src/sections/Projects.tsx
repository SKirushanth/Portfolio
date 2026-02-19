export default function Projects() {
  const projects = [
    { id: 1, title: "Product Design", cat: "Shaping Experiences", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop" },
    { id: 2, title: "Brand Identity", cat: "Visual Systems", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop" },
    { id: 3, title: "Cloud Solutions", cat: "Infrastructure", img: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?q=80&w=600&auto=format&fit=crop" },
  ];

  return (
    /* Reduced top padding from py-24 to pt-12 to close the gap with Services */
    <section id="projects" className="px-6 pt-12 pb-24 bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20 items-end">
          <div className="md:col-span-7">
            <p className="text-orange-500 font-bold uppercase text-xs tracking-widest mb-4">Behind the Designs</p>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tighter">
              Shaping Experiences That Make Life Simpler
            </h2>
          </div>
          <div className="md:col-span-5 max-w-md">
            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              I'm a software engineer focused on building clean, intuitive interfaces that solve real-world problems.
            </p>
            <button className="bg-orange-600 hover:bg-orange-700 transition-colors px-8 py-3 rounded-full text-sm font-bold flex items-center gap-2">
              Let's Talk <span className="bg-white/20 rounded-full p-1 text-[10px]">→</span>
            </button>
          </div>
        </div>

        {/* Portrait Image Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((p) => (
              <div key={p.id} className="group cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden rounded-[2rem] mb-5">
                  <img 
                    src={p.img} 
                    alt={p.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                <p className="text-orange-500 text-[10px] font-bold uppercase mb-1 tracking-widest">{p.cat}</p>
                <h4 className="text-xl font-bold group-hover:text-orange-500 transition-colors">{p.title}</h4>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}