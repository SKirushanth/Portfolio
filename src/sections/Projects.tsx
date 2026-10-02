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

        {/* Portrait Image Grid - Cards show image only, description reveals on hover */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {projects.map((project) => (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="group relative block aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-[#111] backdrop-blur transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-orange-500/50 cursor-pointer shadow-lg"
              >
                {/* Project Image - clean and visible by default */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Hover Overlay - reveals description and details on hover */}
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-5 md:p-6 bg-gradient-to-t from-black/95 via-black/75 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg md:text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                        {project.title}
                      </h4>
                      <span className="text-orange-400 text-sm font-semibold">↗</span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-200/90 leading-relaxed font-light">
                      {project.description}
                    </p>
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-white/15 text-orange-300 border border-white/10 backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
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
}