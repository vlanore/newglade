import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import './style.css';

class State {
    xp = 1;
    blood = 20;
    max_xp = 1000;
    corpses = 2;
    zombies = 0;
    hunters = 0;
    exploration_progress = 0;
    exploring = false;
}

let state = new State();

tippy('#explore', {
    content: 'My tooltip!',
});

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

    let nb_hunters = get_element("nb-hunters");
    nb_hunters.innerHTML = `${state.hunters}`;

    let blood_meter = get_element("blood");
    blood_meter.innerHTML = `${state.blood.toFixed(1)} / 100`;

    let explore_meter = get_element("explore");
    let html = `<div class="button-progress" style="width: ` +
        `${state.exploration_progress.toFixed(0)}%">.</div>` +
        `Explore`;
    explore_meter.innerHTML = html;
}

let previous_time = Date.now();

setInterval(() => {
    let now = Date.now();
    let diff = (now - previous_time) / 1000.0;

    state.xp += diff * 1;
    state.blood -= diff * 0.05;
    state.corpses += diff * 0.05 * state.hunters;
    if (state.exploring == true) {
        state.exploration_progress += diff * 20;
        if (state.exploration_progress >= 100) {
            state.exploring = false;
            state.exploration_progress = 0;
            state.corpses += 1;
        }
    }

    update();
    previous_time = now;
}, 100);

let rz_button = get_element("raise-zombie");
rz_button.onclick = () => {
    if (state.corpses >= 1) {
        state.zombies += 1;
        state.corpses -= 1;
    }
    // get_element("skill-choice").hidden = !get_element("skill-choice").hidden;
};

let add_hunter = get_element("add-zombie-hunter");
add_hunter.onclick = () => {
    if (state.zombies > 0) {
        state.zombies -= 1;
        state.hunters += 1;
    }
};

let remove_hunter = get_element("remove-zombie-hunter");
remove_hunter.onclick = () => {
    if (state.hunters > 0) {
        state.zombies += 1;
        state.hunters -= 1;
    }
};

let start_exploration = get_element("explore");
start_exploration.onclick = () => {
    if (state.exploring == false) {
        state.exploring = true;
    }
};