import { projects } from '../data/projects';
import { PROFILE, STACK } from '../data/content';
import type { CSSVars } from '../types';

const d = (n: number): CSSVars => ({ '--d': n });

const headline = ['Problem solver,', 'software engineer'];
const headingText = headline.join(' ');

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="burst" aria-hidden="true" />

      <div className="headline-wrap">
        <p className="eyebrow">Hey, I'm {PROFILE.name}</p>
        <h1 className="headline" aria-label={headingText}>
          {headline.map(line => (
            <span key={line} className="headline-line" aria-hidden="true">
              {Array.from(line, (letter, index) => (
                <span key={index} style={d(headingText.indexOf(line) + index)}>{letter}</span>
              ))}
            </span>
          ))}
        </h1>
      </div>

      <div className="hero-bar">
        <div className="metrics">
          <div className="metric rv" style={d(3)}><strong>{projects.length}</strong><small>Projects shipped</small></div>
          <div className="metric rv" style={d(4)}><strong>{STACK.length}+</strong><small>Technologies</small></div>
          <div className="metric rv" style={d(5)}><strong>2</strong><small>Main stacks · MERN &amp; Spring</small></div>
        </div>
      </div>
    </header>
  );
}
