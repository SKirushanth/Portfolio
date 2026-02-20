import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: "My Portfolio",
    description: "The very site you are looking at right now!",
    image: "/portfolio.png", // This works because the file is in your public folder
    tags: ["React", "TypeScript", "Vite"],
    link: "#",
  },
  {
    id: 2,
    title: "MineO Project",
    description: "A life-mapping platform transforming daily journaling into structured growth.",
    image: "/mineo.jpeg", 
    tags: ["GSAP", "React", "Tailwind"],
    link: "https://www.mineo.life/",
  },
  {
    id: 3,
    title: "Prestige Estate Agent",
    description: "A luxury real estate platform with high-end property listings.",
    image: "/estate-agent.jpeg",
    tags: ["Next.js", "Firebase", "Framer Motion"],
    link: "https://estate-agent-zeta.vercel.app",
  }
];