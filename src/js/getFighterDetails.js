import { getParam, qs, loadHeaderFooter } from "./utils/utils.mjs";
import { getAllFighters } from "./services/sportsDataService.js";

async function initFighterPage() {
    loadHeaderFooter();

    const fighterId = getParam("id");

    if (fighterId) {
        const fighterList = await getAllFighters();

        const fighter = fighterList.find(f => f.FighterId == fighterId);

        if (fighter) {
            renderFighter(fighter);
        }
    }

}

function renderFighter(fighter) {
    qs("#fighterName").textContent = `${fighter.FirstName} ${fighter.LastName}`;
    qs("#weightClass").textContent = fighter.WeightClass;
    qs("#wins").textContent = fighter.Wins;
    qs("#losses").textContent = fighter.Losses;
    qs("#nickname").textContent = fighter.Nickname || "N/A";

    const formattedName = `${fighter.FirstName}-${fighter.LastName}`.toLowerCase();
    qs("#fighterImage").src = `https://fightcompanion123.blob.core.windows.net/fighters/${formattedName}.jpg`;
}

initFighterPage();