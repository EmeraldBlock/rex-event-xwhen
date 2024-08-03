import type { TRexAPIResponse } from "./types";
import { Calendar, CalendarEvent } from "./calendar";
import { Selector } from "./selector";
import { Searcher } from "./searcher";

const api: TRexAPIResponse = await (await fetch("https://rex.mit.edu/api.json")).json();

const dormColors = new Map(Object.entries(api.colors.dorms));
const tagColors = new Map(Object.entries(api.colors.tags));

const events = api.events.map(({ name, dorm, location, start, end, description, tags, group }) => {
    return {
        name,
        dorm,
        location,
        start: Date.parse(start),
        end: Date.parse(end),
        description,
        tags,
        group,
        color: dormColors.get(dorm[0]) ?? "black",
        keywords: [name, dorm.join(" "), location, description, tags.join(" "), group ?? ""].join("\n"),
    } satisfies CalendarEvent;
});

const searcher = new Searcher(document.getElementById("search") as HTMLInputElement);
searcher.init();

const selectorHosts = new Selector(document.getElementById("hosts")!);
selectorHosts.init(api.dorms, dormColors);

const selectorTags = new Selector(document.getElementById("tags")!);
selectorTags.init(api.tags, tagColors);

const calendar = new Calendar(document.getElementsByClassName("interface")[0] as HTMLElement);
calendar.init(events);

function update() {
    calendar.initEvents(events.filter(event =>
        event.dorm.some(d => selectorHosts.match(d))
        && event.tags.some(tag => selectorTags.match(tag))
        && searcher.match(event.keywords)
    ));
}

searcher.signal.add(update);
selectorHosts.signal.add(update);
selectorTags.signal.add(update);
