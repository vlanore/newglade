import './style.css';

let xp = 1;
let max_xp = 1000;

function update_xp() {
  let xp_meter = <HTMLElement>document.getElementById("xp");
  xp_meter.innerHTML = `${xp} / ${max_xp}`;
}

setInterval(() => { xp += 1; update_xp(); }, 250);
