import { getAllFighters } from "./services/sportsDataService.js";
import { loadHeaderFooter, renderListWithTemplate, qs } from "./utils/utils.mjs";

function fighterCardTemplate(fighter) {

    const formattedName = `${fighter.Name}-${fighter.LastName}`.toLowerCase();
    const imageUrl = `https://fightcompanion123.blob.core.windows.net/fighters/${formattedName}.jpg`;

    return `
    <li class="fighter-card">
        <a href="/fighter_pages/index.html?id=${fighter.FighterId}">
            <img src="${imageUrl} alt="${fighter.FirstName} ${fighter.LastName}"
                onerror="this.src='/images/ufc-fighter-placeholder.webp'">
            <h2 class="fighterName">${fighter.FirstName} ${fighter.LastName}</h2>
            <p class="weight-class">${fighter.WeightClass}</p>
            <p class="fighter-record">Record: ${fighter.Wins} - ${fighter.Losses}</p>
        </a>
    </li>`;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function init() {
    await loadHeaderFooter();

    const allFighters = await getAllFighters();
    const listElement = qs("#fighter-list");

    const randomFighters = shuffle(allFighters).slice(0, 12);

    renderListWithTemplate(fighterCardTemplate, listElement, randomFighters, "afterbegin", true);


}
init();