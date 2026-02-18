export default function Services() {
  return (
    <section className="px-4 py-12 grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* Title Card */}
      <div className="md:col-span-4 bg-[#111] p-10 rounded-bento border border-white/5">
        <p className="text-orange-500 font-bold uppercase text-xs tracking-widest mb-4">Services</p>
        <h2 className="text-5xl font-bold leading-tight">What I Can Help You With</h2>
      </div>

      {/* Description Card */}
      <div className="md:col-span-8 bg-[#111] p-10 rounded-bento border border-white/5 flex flex-col justify-between">
        <p className="text-2xl text-gray-400 max-w-xl">
          From strategy to visuals, I offer tailored services to help your brand grow with clarity and impact.
        </p>
        <div className="mt-8 flex justify-between items-center">
          <p className="text-gray-500 text-sm">Let's Build Something Meaningful Together</p>
          <button className="bg-orange-600 px-6 py-3 rounded-full text-sm font-bold">Get in touch →</button>
        </div>
      </div>

      {/* Individual Service Cards */}
      {[
        { title: "Brand Identity", sub: "Your brand, visually defined." },
        { title: "Brand Strategy", sub: "Clarity behind the visuals." },
        { title: "Creative Consulting", sub: "Ongoing expert guidance." }
      ].map((s) => (
        <div key={s.title} className="md:col-span-4 bg-[#111] p-10 rounded-bento border border-white/5 hover:border-orange-500/50 transition-all group">
          <div className="w-16 h-1 bg-orange-600 mb-8 transition-all group-hover:w-full" />
          <p className="text-orange-500 text-xs font-bold mb-2 uppercase">{s.sub}</p>
          <h4 className="text-2xl font-bold">{s.title}</h4>
        </div>
      ))}
    </section>
  );
}