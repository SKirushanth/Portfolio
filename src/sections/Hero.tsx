// @ts-ignore
import Typewriter from 'typewriter-effect';
import PillNav from '../components/PillNav';

export default function Hero() {
  return (
    <section id="home" className="p-2 md:p-4 min-h-screen">
      <div className="relative min-h-[95vh] md:h-full w-full bg-gradient-to-br from-[#e85a2d] via-[#b52a1d] to-[#0a0a0a] rounded-[2rem] md:rounded-[3rem] overflow-hidden flex flex-col justify-between p-6 md:p-12">
        
        {/* CENTERED NAVIGATION */}
        <div className="relative z-50 w-full flex justify-center pt-4 md:pt-0">
          <PillNav
            items={[
              { label: 'Home', href: '#home' },
              { label: 'About', href: '#about' },
              { label: 'Projects', href: '#projects' },
              { label: 'Contact', href: '#contact' }
            ]}
            activeHref="#home"
            baseColor="#0a0a0a"           // Deep black bar
            pillColor="#e85a2d"           // Vibrant orange hover circle
            pillTextColor="#ffffff"       // White text for high contrast
            hoveredPillTextColor="#0a0a0a" // Black text when hover is active
          />
        </div>

        {/* MAIN CONTENT - mt-32 provides space for the centered nav */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 items-end gap-8 md:gap-12 mb-8 md:mb-12 mt-32 md:mt-0 text-white">
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