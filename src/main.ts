import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import './style.css';

class State {
    xp = 1;
    meta_xp = 0;
    blood = 20;
    max_xp = 1000;
    corpses = 2;
    zombies = 0;
    hunters = 0;
    exploration_progress = 0;
    exploring = false;
    dead = false;
}

let state = new State();
let previous_time = Date.now();

let blood_tooltip = tippy('#blood-bar', {
    content: '',
})[0];
let xp_tooltip = tippy('#experience-bar', {
    content: '',
})[0];

function get_element(id: string): HTMLElement {
    let element = document.getElementById(id);
    if (element == null) {
        throw new Error(`Element with id ${id} not found.`);
    }
    return element;
}

function query_element(query: string): HTMLElement {
    let element = document.querySelector(query);
    if (element == null || !(element instanceof HTMLElement)) {
        throw new Error(`Element with query ${query} not found.`);
    }
    return element;
}

function update(): void {
    if (!state.dead) {
        let xp_bar_bar = query_element("#experience-bar .progress-bar-before");
        xp_tooltip.setContent(`Experience ${state.xp.toFixed(0)} / 1000`);
        xp_bar_bar.style = `width: ${state.xp / 10}%`;

        let zombies_meter = get_element("zombies");
        zombies_meter.innerHTML = `${state.zombies}`;

        let corpses_meter = get_element("corpses");
        corpses_meter.innerHTML = `${Math.trunc(state.corpses)}`;

        let nb_hunters = get_element("nb-hunters");
        nb_hunters.innerHTML = `${state.hunters}`;

        blood_tooltip.setContent(`Blood ${state.blood.toFixed(1)} / 100`);
        let blood_meter_bar = query_element("#blood-bar .progress-bar-before");
        blood_meter_bar.style = `width: ${state.blood}%;`;

        let explore_meter = get_element("explore");
        let html = `Explore<br/>${state.exploration_progress.toFixed(0)}%`;
        explore_meter.innerHTML = html;
    } else {
        let meta_xp = get_element("meta-xp-death");
        meta_xp.innerHTML = `You have ${state.meta_xp.toFixed(1)} meta XP`;
    }
}

setInterval(() => {
    let now = Date.now();
    let diff = (now - previous_time) / 1000.0;

    if (!state.dead) {

        state.xp += diff * 1;
        state.corpses += diff * 0.05 * state.hunters;

        if (state.exploring == true) {
            state.exploration_progress += diff * 20;
            if (state.exploration_progress >= 100) {
                state.exploring = false;
                state.exploration_progress = 0;
                state.corpses += 1;
            }
        }

        state.blood -= diff * 2.5;

        // death
        if (state.blood <= 0) {
            state.dead = true;
            state.meta_xp += state.xp / 10.0;
            get_element("main-columns").classList.add("hidden");
            get_element("death-screen").hidden = false;
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

let restart_button = get_element("restart");
restart_button.onclick = () => {
    if (state.dead) {
        let meta_xp = state.meta_xp;
        state = new State();
        state.meta_xp = meta_xp;
        get_element("main-columns").classList.remove("hidden");
        get_element("death-screen").hidden = true;
    }
};