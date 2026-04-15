import { getUfcSchedule } from "./services/sportsDataService.js";
import { loadHeaderFooter, renderListWithTemplate, qs } from "./utils/utils.mjs";

function eventTemplate(event) {

    const eventDate = new Date(event.Day).toLocaleDateString("en-US", {
        weekday: "long", month: "long", day: "numeric"
    });

    const name = event.ShortName;
    const imageSlug = name.toLowerCase().replace(/\s+/g, "-");
    const imageUrl = `https://fightcompanion123.blob.core.windows.net/events/${imageSlug}.jpg`;

    return `
    <li class="event-card">
        <div class="event-image">
            <img src="${imageUrl}" alt="${event.ShortName}" onerror="this.src='/images/ufc-fighter-placeholder.webp'">
        <div class="event-date">${eventDate}</div>
        <h2 class="event-name">${event.Name}</h2>
        <p class="event-location">📍To be anounced </P>
    </li>`;


}

async function initEvents() {
    await loadHeaderFooter();

    const events = await getUfcSchedule();
    const listElement = qs("#events-list");

    const upcomingEvents = events.filter(e => e.Status !== "Final");

    renderListWithTemplate(eventTemplate, listElement, upcomingEvents);
}
initEvents();
