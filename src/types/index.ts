import type React from 'react';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  glow: string;
  tags: string[];
  link: string;
  features: string[];
  github?: string;
}

export type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>;
