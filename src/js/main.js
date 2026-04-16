import { loadHeaderFooter, qs, setClick, getLocalStorage, renderListWithTemplate } from "./utils/utils.mjs";
import { getUfcRankings } from "./services/getRankingData.js";
import { getUfcFighterData } from "./services/getFighterData.js";
import { getAllFighters } from "./services/sportsDataService.js";
import { getUfcSchedule } from "./services/sportsDataService.js";



loadHeaderFooter();



async function initChampions() {
    const data = await getUfcRankings();
    const listElement = qs("#champions-list");

    if (data && data.rankings) {
        const bestFigthers = data.rankings[0].ranks.slice(0, 5);
        console.log("best fighters", bestFigthers);
        renderListWithTemplate(championTemplate, listElement, bestFigthers);

    }

}

async function initUpcomingEvents() {
    const events = await getUfcSchedule();
    const listElement = qs(".events-list");

    if (events && Array.isArray(events)) {
        const today = new Date();

        const upcoming = events
            .filter(event => new Date(event.Day) >= today)
            .sort((a, b) => new Date(a.Day) - new Date(b.Day))
            .slice(0, 5);
            
            
             

        renderListWithTemplate(eventTemplate, listElement, upcoming);
    }
};


function championTemplate(champion) {
    const name = champion.name;
    const rank = champion.rank;
    const imageSlug = name.toLowerCase().replace(/\s+/g, "-");
    const imageUrl = `https://fightcompanion123.blob.core.windows.net/fighters/${imageSlug}.jpg`;

    return `
    <li class="champ-card">
        <div class="champ-image">
            <img src="${imageUrl}" alt="${champion.imageUrl}" onerror="this.src='/images/ufc-fighter-placeholder.webp'">
        
        <h2 class="champ-name">${champion.name}</h2>
        <p class="champ-rank">Rank: ${champion.rank}</p>
    </li>`;
}

function eventTemplate(event) {
    const eventDate = new Date(event.Day).toLocaleDateString("en-US", {
        weekday: "short", month: "short", day: "numeric"
    });
    
    let imageSlug;

    if (event.ShortName === "UFC Fight Night") {

        const detailedName = event.Name.split(":")[1] || event.Name;
        imageSlug = detailedName.toLowerCase().trim().replace(/\s+/g, "-").replace(/vs\./g, "vs");

    } else {
        imageSlug = event.ShortName.toLowerCase().replace(/\s+/g, "-");
    }
    const imageUrl = `https://fightcompanion123.blob.core.windows.net/events/${imageSlug}.jpg`;

    return `
    <li class="event-card">
        <h3 class="event-name">${event.Name}</h3>
        <p class="event-date">${eventDate}</p>
        <img src="${imageUrl}" alt="${event.ShortName}" onerror="this.src='/images/ufc-fighter-placeholder.webp'">
    </li>`;
     };



async function initFighterData() {
    const fighterData = await getUfcFighterData();
}
async function initFighterInfo() {
    const fighterInfoData = await getAllFighters();
}
export function generateFighterUrl(apiName) {
    const formattedName = apiName.trim().toLowerCase().replace(/ /g, "-");

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



initChampions();
initUpcomingEvents();
initFighterData();
initFighterInfo();


