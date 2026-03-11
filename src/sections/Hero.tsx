// @ts-ignore
import Typewriter from 'typewriter-effect';

export default function Hero() {
  return (
    <section id="home" className="p-2 md:p-4 min-h-screen">
      <div className="relative min-h-[95vh] md:h-full w-full bg-gradient-to-br from-[#e85a2d] via-[#b52a1d] to-[#0a0a0a] rounded-[2rem] md:rounded-[3rem] overflow-hidden flex flex-col justify-between p-6 md:p-12">

        {/* Top utility bar */}
        <div className="absolute inset-x-0 top-6 z-20 pointer-events-none">
          <div className="mx-auto max-w-5xl px-6 flex justify-end">
            <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/10 bg-[#0a0a0a]/85 backdrop-blur-xl px-2 py-1 shadow-2xl">
              <a
                href="/Kirushanth_Sathiyaseelan_resume.pdf"
                download
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-white/85 transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
        
        {/* MAIN CONTENT - Adjusted padding for fixed nav */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 items-end gap-8 md:gap-12 mb-8 md:mb-12 mt-32 md:mt-24 text-white">
          <div className="md:col-span-8">
            <p className="text-lg md:text-2xl font-medium mb-2 opacity-80">Hey, I'm a</p>
            <div className="text-4xl sm:text-5xl md:text-[8vw] font-bold leading-[1.1] md:leading-[0.8] tracking-tighter uppercase min-h-[120px] md:min-h-[1.6em]">
              <Typewriter
                options={{
                  strings: [
                    'Problem <br/> Solver',
                    'Software <br/> Engineer',
                    'Fullstack <br/> Developer'
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 40,
                  deleteSpeed: 25,
                  cursor: '',
                }}
              />
            </div>
          </div>

          <div className="md:col-span-4 max-w-md pb-0 md:pb-4">
            <h3 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 leading-tight">
              Great design should <br className="hidden md:block" /> feel invisible.
            </h3>
            <p className="text-xs md:text-base opacity-60 leading-relaxed font-light">
              Engineering scalable systems with a focus on human-centric design. I build digital products that balance performance with aesthetics.
            </p>
          </div>
        </div>

        {/* STATS / FEATURES FOOTER */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-white">
          {[
            { num: "01", label: "Full Stack Dev" },
            { num: "02", label: "UI/UX Architecture" },
            { num: "03", label: "AI & API Integration" },
            { num: "04", label: "Backend & Cloud Systems" },
          ].map((item) => (
            <div key={item.num} className="group">
              <span className="text-[9px] md:text-[10px] text-orange-400 font-black block mb-1">#{item.num}</span>
              <p className="text-[10px] md:text-sm font-bold opacity-80 group-hover:opacity-100 transition-opacity uppercase tracking-tight">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}