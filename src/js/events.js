import { getUfcSchedule } from "./services/sportsDataService.js";
import { loadHeaderFooter, renderListWithTemplate, qs } from "./utils/utils.mjs";

function eventTemplate(event) {

    const eventDate = new Date(event.Day).toLocaleDateString("en-US", {
        weekday: "long", month: "long", day: "numeric"
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




async function initEvents() {
    await loadHeaderFooter();

    const events = await getUfcSchedule();
    const listElement = qs("#events-list");

    const upcomingEvents = events.filter(e => e.Status !== "Final");

    renderListWithTemplate(eventTemplate, listElement, upcomingEvents);
}
initEvents();
