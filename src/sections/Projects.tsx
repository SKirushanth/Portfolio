import { projects } from '../data/projects';

export default function Projects() {
  return (
    /* Added id="projects" for navigation */
    <section id="projects" className="px-6 py-24 bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Grid */}
        <div className="mb-20 text-center">
          <p className="text-orange-500 font-bold uppercase text-xs tracking-widest mb-4">Behind the Designs</p>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tighter">
            SHAPING EXPERIENCES THAT MAKE LIFE SIMPLER
          </h2>
        </div>

        {/* Portrait Image Grid - Size Reduced via max-w container */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="group block cursor-pointer"
              >
                {/* Reduced size by adjusting aspect ratio and margin */}
                <div className="aspect-4/5 overflow-hidden rounded-4xl mb-5">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                <p className="text-orange-500 text-[10px] font-bold uppercase mb-1 tracking-widest">{project.description}</p>
                <h4 className="text-xl font-bold group-hover:text-orange-500 transition-colors">{project.title}</h4>
              </a>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}