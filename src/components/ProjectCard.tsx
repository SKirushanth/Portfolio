import type { Project } from '../types';

interface Props {
  project: Project;
}

const ProjectCard = ({ project }: Props) => {
  return (
    <div style={{ 
      border: '1px solid #444', 
      padding: '1rem', 
      borderRadius: '8px',
      backgroundColor: '#222' 
    }}>
      <img src={project.image} alt={project.title} style={{ width: '100%', borderRadius: '4px' }} />
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div>
        {project.tags.map(tag => (
          <span key={tag} style={{ marginRight: '10px', color: '#646cff' }}>#{tag}</span>
        ))}
      </div>
      <a href={project.link} target="_blank" rel="noreferrer" style={{ color: 'white', display: 'block', marginTop: '10px' }}>
        View Project →
      </a>
    </div>
  );
};

export default ProjectCard;