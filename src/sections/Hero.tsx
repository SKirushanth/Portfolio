// @ts-ignore
import Typewriter from 'typewriter-effect';

export default function Hero() {
  return (
    <section id="home" className="p-4 h-screen">
      {/* Changed bg-linear to bg-gradient */}
      <div className="relative h-full w-full bg-gradient-to-br from-[#e85a2d] via-[#b52a1d] to-[#0a0a0a] rounded-[3rem] overflow-hidden flex flex-col justify-between p-8 md:p-12">
        
        {/* Navbar */}
        <nav className="relative z-10 flex justify-between items-center w-full">
          <span className="text-2xl font-bold tracking-tighter text-white">Portfolio</span>
          <div className="flex gap-8 text-[11px] uppercase tracking-[0.3em] font-semibold text-white/70">
            <a href="#home" className="hover:text-white border-b border-white pb-1 transition">Home</a>
            <a href="#about" className="hover:text-white transition">About</a>
            <a href="#projects" className="hover:text-white transition">Projects</a>
          </div>
          <div className="w-10"></div>
        </nav>

        {/* Main Body Section */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 items-end gap-12 mb-12 text-white">
          <div className="md:col-span-8">
            <p className="text-xl md:text-2xl font-medium mb-2 opacity-80">Hey, I'm a</p>
            <div className="text-6xl md:text-[8vw] font-bold leading-[0.8] tracking-tighter uppercase min-h-[1.6em]">
              <Typewriter
                options={{
                  strings: [
                    'Software <br/> Engineer',
                    'Fullstack <br/> Developer',
                    'System <br/> Architect',
                    'Problem <br/> Solver'
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 40,
                  deleteSpeed: 25,
                  cursor: '', // I added this to keep it clean as per your last request
                }}
              />
            </div>
          </div>

          <div className="md:col-span-4 max-w-md pb-4">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
              Great design should <br /> feel invisible.
            </h3>
            <p className="text-sm md:text-base opacity-60 leading-relaxed font-light">
              Engineering scalable systems with a focus on human-centric design. I build digital products that balance performance with aesthetics.
            </p>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/10 text-white">
          {[
            { num: "01", label: "Full Stack Dev" },
            { num: "02", label: "UI/UX Architecture" },
            { num: "03", label: "System Design" },
            { num: "04", label: "Cloud Engineering" },
          ].map((item) => (
            <div key={item.num} className="group">
              <span className="text-[10px] text-orange-400 font-black block mb-1">#{item.num}</span>
              <p className="text-sm md:text-base font-bold opacity-80 group-hover:opacity-100 transition-opacity uppercase tracking-tight">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}