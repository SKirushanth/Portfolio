import { projects } from '../data/projects';
import SplitText from '../components/SplitText';

export default function Projects() {
  return (
    /* Added id="projects" for navigation */
    <section id="projects" className="px-6 py-24 bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Grid */}
        <div className="mb-20 text-center space-y-3">
          <p className="text-orange-500 font-bold uppercase text-xs tracking-widest mb-4">Behind the Designs</p>
          <SplitText 
            text="SHAPING EXPERIENCES THAT MAKE LIFE SIMPLER"
            tag="h2"
            className="text-4xl md:text-6xl font-bold leading-tight tracking-tighter"
            splitType="words"
            delay={40}
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
          />
          <p className="text-sm md:text-base text-white/60 max-w-2xl mx-auto">A few builds that balance clarity, craft, and calm motion.</p>
        </div>

        {/* Portrait Image Grid - Slightly tighter width to shrink cards */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {projects.map((project) => (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="group block h-full cursor-pointer"
              >
                <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5/50 p-4 md:p-5 backdrop-blur transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:border-orange-500/50">
                  <div className="relative mb-4 overflow-hidden rounded-2xl border border-white/10 aspect-[4/5]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-orange-500 text-[10px] font-bold uppercase tracking-widest">{project.description}</p>
                    <h4 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">{project.title}</h4>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}