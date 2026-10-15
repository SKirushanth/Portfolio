import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: "The Reader's Nook",
    description: "Library manager simplifying book organization and borrower tracking.",
    image: "/lb.jpg", // This works because the file is in your public folder
    tags: ["React", "Docker", "Springboot"],
    link: "#",
  },
  {
    id: 2,
    title: "MineO Project",
    description: "A life mapping platform transforming daily journaling into structured growth.",
    image: "/mineo.jpeg", 
    tags: ["GSAP", "React", "Tailwind"],
    link: "https://www.mineo.life/",
  },
  {
    id: 3,
    title: "Prestige Estate Agent",
    description: "A luxury real estate platform with high-end property listings.",
    image: "/prestiege.jpg",
    tags: ["Next.js", "Firebase", "Framer Motion"],
    link: "https://estate-agent-zeta.vercel.app",
  },
  {
    id: 4,
    title: "Next Role",
    description: "NextRole is a full-stack job application tracker ",
    image: "/nextrole.png",
    tags: ["React", "FastAPI", "PostgreSQL", "Docker"],
    link: "#",
  }
];