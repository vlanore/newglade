import './style.css';

class State {
    xp = 1;
    max_xp = 1000;
    corpses = 2;
    zombies = 0;
    fighters = 0;
}

let state = new State();

function get_element(id: string): HTMLElement {
    let element = document.getElementById(id);
    if (element == null) {
        throw new Error(`Element with id ${id} not found.`);
    }
    return element;
}

function update() {
    let xp_meter = get_element("xp");
    xp_meter.innerHTML = `${state.xp.toFixed(1)} / ${state.max_xp}`;

    let zombies_meter = get_element("zombies");
    zombies_meter.innerHTML = `${state.zombies}`;

    let corpses_meter = get_element("corpses");
    corpses_meter.innerHTML = `${Math.trunc(state.corpses)}`;
}

let previous_time = Date.now();

setInterval(() => {
    let now = Date.now();
    let diff = (now - previous_time) / 1000.0;

    state.xp += diff * 1;
    state.corpses += diff * 0.01 * state.zombies;

    update();
    previous_time = now;
}, 100);

let rz_button = get_element("raise-zombie");
rz_button.onclick = () => {
    if (state.corpses >= 1) {
        state.zombies += 1;
        state.corpses -= 1;
    }
};
