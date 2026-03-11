declare module 'typewriter-effect';

declare module 'gsap/SplitText' {
  export class SplitText {
    constructor(target: HTMLElement | string, config?: any);
    chars: Element[];
    words: Element[];
    lines: Element[];
    revert(): void;
  }
}