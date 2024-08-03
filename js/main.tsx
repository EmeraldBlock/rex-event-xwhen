import { Calendar, CalendarEvent } from "./calendar";
import type { TRexAPIResponse } from "./types";

const api: TRexAPIResponse = await (await fetch("https://rex.mit.edu/api.json")).json();

const colors = new Map(Object.entries(api.colors.dorms));

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
        color: colors.get(dorm[0]) ?? "black",
    } satisfies CalendarEvent;
});

const calendar = new Calendar(document.getElementsByTagName("main")[0] as HTMLElement);
calendar.init(events);
