export default function Services() {
  return (
    <section id="about" className="px-4 py-8 bg-[#0a0a0a]">
      {/* Top Grid: Title and Main Description */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
        
        {/* Header Card */}
        <div className="md:col-span-4 bg-[#111] p-10 rounded-[2.5rem] border border-white/5 flex flex-col justify-center">
          <p className="text-orange-500 font-bold uppercase text-xs tracking-widest mb-4">Services</p>
          <h2 className="text-5xl font-bold leading-tight">What I Can Build For You</h2>
        </div>

        {/* Big Description Card */}
        <div className="md:col-span-8 bg-[#111] p-10 rounded-[2.5rem] border border-white/5 flex flex-col justify-between">
          <p className="text-2xl md:text-3xl text-gray-400 leading-snug">
            Leveraging modern frameworks, I offer clean, efficient, and scalable 
            solutions that drive innovation and solve complex engineering challenges.
          </p>
          <div className="mt-12 flex justify-between items-center">
            <p className="text-gray-500 text-sm font-medium">Let's Build Something Meaningful Together</p>
            <button className="bg-orange-600 hover:bg-orange-700 transition-colors px-8 py-3 rounded-full text-sm font-bold flex items-center gap-2">
              Let's Build Together <span className="bg-white/20 rounded-full p-1 text-[10px]">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { 
            title: "Web Application Development", 
            sub: "Your brand, defined.", 
            desc: "Full-stack solutions using React, Node.js, and modern cloud architecture." 
          },
          { 
            title: "API Design & Integration", 
            sub: "Clarity behind the visuals.", 
            desc: "Building robust, secure, and scalable REST & GraphQL endpoints." 
          },
          { 
            title: "Cloud Infrastructure & Deployment", 
            sub: "Ongoing expert guidance.", 
            desc: "Optimizing performance and reliability with AWS and CI/CD pipelines." 
          }
        ].map((service, index) => (
          <div key={index} className="bg-[#111] p-10 rounded-[2.5rem] border border-white/5 hover:border-orange-500/30 transition-all group">
            <div className="w-16 h-0.5 bg-orange-600 mb-8 transition-all group-hover:w-full" />
            <p className="text-orange-500 text-[10px] font-bold mb-3 uppercase tracking-tighter">
              {service.sub}
            </p>
            <h4 className="text-2xl font-bold mb-4">{service.title}</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}