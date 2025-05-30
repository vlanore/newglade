import './style.css';

class State {
    xp = 1;
    max_xp = 1000;
}

let state = new State();

function get_element(id: string): HTMLElement {
    let element = document.getElementById(id);
    if (element == null) {
        throw new Error(`Element with id ${id} not found.`);
    }
    return element;
}

function update_xp() {
    let xp_meter = get_element("xp");
    xp_meter.innerHTML = `${state.xp} / ${state.max_xp}`;
}

setInterval(() => { state.xp += 1; update_xp(); }, 500);

let rz_button = get_element("raise-zombie");
rz_button.onclick = () => {
    let zombies_counter = get_element("zombies");
    zombies_counter.innerHTML = `1`;
};
