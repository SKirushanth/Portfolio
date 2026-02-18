export default function Projects() {
  const projects = [
    { id: 1, title: "Product Design", cat: "Shaping Experiences", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop" },
    { id: 2, title: "Brand Identity", cat: "Visual Systems", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop" },
    { id: 3, title: "Cloud Solutions", cat: "Infrastructure", img: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?q=80&w=600&auto=format&fit=crop" },
  ];

  return (
    <section className="px-4 py-20 bg-[#0a0a0a]">
      {/* Header Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 items-end">
        <div className="md:col-span-7">
          <p className="text-orange-500 font-bold uppercase text-xs tracking-widest mb-4">Behind the Designs</p>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Shaping Experiences That Make Life Simpler
          </h2>
        </div>
        <div className="md:col-span-5 max-w-md">
          <p className="text-gray-400 text-lg mb-6 leading-relaxed">
            I'm a software engineer focused on building clean, intuitive interfaces that solve real-world problems.
          </p>
          <button className="bg-orange-600 px-8 py-3 rounded-full text-sm font-bold flex items-center gap-2">
            Let's Talk <span className="bg-white/20 rounded-full p-1 text-[10px]">→</span>
          </button>
        </div>
      </div>

      {/* Portrait Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="group cursor-pointer">
            <div className="aspect-[3/4] overflow-hidden rounded-[2.5rem] mb-6">
              <img 
                src={p.img} 
                alt={p.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
            </div>
            <p className="text-orange-500 text-[10px] font-bold uppercase mb-1">{p.cat}</p>
            <h4 className="text-2xl font-bold">{p.title}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}