import './style.css';

class State {
  xp = 1;
  max_xp = 1000;
}

let state = new State();

function update_xp() {
  let xp_meter = document.getElementById("xp");
  if (xp_meter == null) { throw new Error(); }
  xp_meter.innerHTML = `${state.xp} / ${state.max_xp}`;
}

setInterval(() => { state.xp += 1; update_xp(); }, 250);
