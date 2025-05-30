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

setInterval(() => { state.xp += 1; update_xp(); }, 500);

let rz_button = document.getElementById("raise-zombie");
if (rz_button == null) { throw new Error(); }
rz_button.onclick = () => {
  let zombies_counter = document.getElementById("zombies");
  zombies_counter.innerHTML = `1`;
};
