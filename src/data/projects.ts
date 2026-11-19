import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 4,
    title: "Next Role",
    description: "NextRole is a full-stack job application tracker that brings roles, application stages, and follow-ups into one place.",
    features: ["Organize roles and job applications", "Track application stages", "Keep follow-ups in view"],
    image: "/nextrole.svg",
    glow: "#152e42",
    tags: ["React", "FastAPI", "PostgreSQL", "Docker"],
    link: "https://ca-web.whiterock-25185778.centralindia.azurecontainerapps.io/",
  },
  {
    id: 2,
    title: "MineO Project",
    description: "A life mapping platform transforming daily journaling into structured growth.",
    features: ["Capture daily journal entries", "Map reflections into a structured view of personal growth"],
    image: "/mineo.svg",
    glow: "#1d3557",
    tags: ["GSAP", "React", "Tailwind"],
    link: "https://www.mineo.life/",
  },
  {
    id: 1,
    title: "The Reader's Nook",
    description: "Library manager simplifying book organization and borrower tracking.",
    features: ["Organize the library catalog", "Track borrowers and book loans"],
    image: "/lb.svg",
    glow: "#281d45",
    tags: ["React", "Docker", "Springboot"],
    link: "#",
  },
  {
    id: 3,
    title: "Prestige Estate Agent",
    description: "A luxury real estate platform with high-end property listings.",
    features: ["Browse high-end property listings", "Explore individual properties"],
    image: "/prestiege.svg",
    glow: "#362a22",
    tags: ["Next.js", "Firebase", "Framer Motion"],
    link: "https://estate-agent-zeta.vercel.app",
  },
];
