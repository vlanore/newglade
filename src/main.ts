import { setupCounter } from './counter.ts';
import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <button>Explore</button>
    <button>Forage</button>
    <button>Rest</button>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);
