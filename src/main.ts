import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <p>
      Time: 0
    </p>
    <button>Explore</button>
    <button>Forage</button>
    <button>Hunt</button>
  </div>
`;


let count: number = 0;


setInterval(() => {
  count += 1;
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <p>
      Time: ${count}
    </p>
    <button>Explore</button>
    <button>Forage</button>
    <button>Hunt</button>
  </div>
`;
}, 100);