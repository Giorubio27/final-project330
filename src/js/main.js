import { loadHeaderFooter, qs } from "./utils/utils.mjs";
import { getUfcRankings } from "./services/getRankingData";
import { getUfcFighterData } from "./services/getFighterData";
import { getAllFighters } from "./services/sportsDataService";
import { setClick } from "./utils/utils.mjs";



loadHeaderFooter();

async function initRankings() {
    const data = await getUfcRankings();

}
async function initFighterData() {
    const fighterData = await getUfcFighterData();
}
async function initFighterInfo() {
    const fighterInfoData = await getAllFighters();
}
export function generateFighterUrl(apiName) {
    const formattedName = apiName.toLowerCase().replace(" ", "-");

    return `https://fightcompanion123.blob.core.windows.net/fighters/${formattedName}.jpg`;
}

async function searchFighter(inputName) {
    const allFighters = await getAllFighters();

    const fighter = allFighters.find(f => {
        const fullName = `${f.FirstName}${f.LastName}`.toLowerCase();
        return fullName === inputName.toLowerCase().trim();

    });

    if (fighter) {
        const photoUrl = generateFighterUrl(`${fighter.FirstName}${fighter.LastName}`)

        DisplayFighterCard(fighter, photoUrl)
    } else {
        console.log("Fighter is not in our records")
    }
    
}

async function handleSearch() {
    const searchInput = qs("#fighter-search-input").value.toLowerCase().trim();
    const allFighters = await getAllFighters();

    const match = allFighters.find(f => {
        const fullName = `${f.FirstName} ${f.LastName}`.toLowerCase();
        return fullName === searchInput;
        
    })

    if (match) {
        window.location.href = `fighter_pages/index.html?id=${match.FighterId}`;
    } else {
        console.log("No match was found")
    }

    
}
setClick("#searchButton", handleSearch)



initRankings();
initFighterData();
initFighterInfo();


