import { clamp, time12, mitDay, mod, T, mitTime, offset, daysOfWeek } from "./utils";

export type CalendarEvent = {
    name: string,
    description: string,
    dorm: string[],
    group: string | null,
    location: string,
    start: number,
    end: number,
    tags: string[],
    color: string,
};

const intervals = [T.min*15, T.min*30, T.hr, T.hr*2, T.hr*6, T.hr*12, T.day];
const emphs = [T.hr, T.hr, T.hr*6, T.hr*6, T.day, T.day, T.day];

export class Calendar {
    public start!: number;
    public end!: number;
    public minPx = 0;
    public tracks!: CalendarEvent[][];

    constructor(public element: HTMLElement) {}

    getClass(className: string) {
        const collection = this.element.getElementsByClassName(className);
        if (collection.length !== 1) {
            throw new Error(`"${className}" does not uniquely exist`);
        }
        return collection[0] as HTMLElement;
    }

    makeDate(time: number) {
        const tim = mitTime(time);
        const date = new Date(tim);
        const dat = date.getUTCDate();
        const day = date.getUTCDay();
        const str = `${daysOfWeek[day]} ${dat}`
        return <div class="date" style={`left: calc(${(time-this.start)/T.min}*var(--min))`}>
            {str}
        </div>;
    }

    makeMarking(time: number, dt: number) {
        const tim = mitTime(time);
        const frac = (tim%T.day)/T.hr;
        const bold = tim%dt == 0 ? "bold" : "";
        return [
            <div class={`time ${bold}`} style={`
                left: calc(${(time-this.start)/T.min}*var(--min) + 1px);
                --color: color-mix(in srgb, orange, blue ${Math.abs(frac-12)/12*100}%);
            `}>
                <div class="tab" />
                <div class="hour">{time12(tim)}</div>
            </div>,
            <div class={`bar ${bold}`} style={`
                left: calc(${(time-this.start)/T.min}*var(--min) - 1px);
                --color: color-mix(in srgb, orange, blue ${Math.abs(frac-12)/12*100}%);
            `} />,
        ];
    }

    initMarkings() {
        const left = this.start + this.element.scrollLeft / 2**this.minPx * T.min;
        const right = left + this.element.clientWidth / 2**this.minPx * T.min;
        const dates = this.getClass("dates");
        const times = this.getClass("times");
        const markings = this.getClass("markings");
        dates.replaceChildren();
        times.replaceChildren();
        markings.replaceChildren();
        const i = intervals.findIndex(dt => dt / T.min * 2**this.minPx > 60) ?? -1;
        const dt = intervals.at(i)!;
        const et = emphs.at(i)!;
        for (let time = left - mod(left+offset*T.hr, dt) - dt; time <= right + dt; time += dt) {
            const [tab, bar] = this.makeMarking(time, et);
            times.append(tab);
            markings.append(bar);
        }
        for (let time = left - mod(left+offset*T.hr, et) + et/2; time < right; time += et) {
            dates.append(this.makeDate(time));
        }
    }

    getTracks(events: CalendarEvent[]) {
        const items = events.map(event => {
            const { start, end } = event;
            return { start, end, event };
        }).sort((a, b) => a.start - b.start);

        const tracks: { end: number, items: CalendarEvent[] }[] = [];
        for (const { start, end, event } of items) {
            const track = tracks.find(track => track.end <= start)
                ?? (() => {
                    const track = { end: 0, items: [] };
                    tracks.push(track);
                    return track;
                })();
            track.items.push(event);
            track.end = end;
        }
        // TODO: don't do this here
        return tracks;
    }

    initEvents(events: CalendarEvent[]) {
        const eventsElem = this.getClass("events");
        this.tracks = this.getTracks(events).map(track => track.items);
        for (const track of this.tracks) {
            const telem = <div class="track" />;
            for (const { name, dorm, location, start, end, description, tags, group, color } of track) {
                telem.append(<div class="event" style={`
                    left: calc(${(start-this.start)/T.min}*var(--min));
                    width: calc(${(end-start)/T.min}*var(--min));
                    --color: ${color};
                `}>
                    <b>{name}</b>
                    <div class="info">
                        <i>{dorm.join(", ")}</i><br />
                        {description}<br />
                        📍 {location}{group == null ? "" : ` 👥 ${group}`}<br />
                        {tags.join(" ⋅ ")}
                    </div>
                </div>);
            }
            eventsElem.append(telem);
        }
    }

    registerListeners() {
        const viewport = this.getClass("viewport");
        const mainElem = this.element;
        mainElem.addEventListener("mousemove", (event) => {
            if (!(event.buttons & 1)) return;
            viewport.scrollBy(0, -event.movementY);
            mainElem.scrollBy(-event.movementX, 0);
        });
        mainElem.addEventListener("wheel", (event) => {
            event.preventDefault();
            const oldMinPx = this.minPx;
            this.minPx -= event.deltaY/200;
            this.minPx = clamp(this.minPx, Math.log2(mainElem.clientWidth/(this.end-this.start)*T.min), 3);
            mainElem.style.setProperty("--min", `${2 ** this.minPx}px`);
            mainElem.scroll((mainElem.scrollLeft + event.clientX) * 2 ** (this.minPx - oldMinPx) - event.clientX, 0);
            this.initMarkings();
        });
        mainElem.addEventListener("scroll", (event) => {
            this.initMarkings();
        });
        window.addEventListener("resize", (event) => {
            this.initMarkings();
        });
    }

    init(events: CalendarEvent[]) {
        let start = Math.min(...events.map(event => event.start));
        let end = Math.max(...events.map(event => event.end));
        this.start = mitDay(start);
        this.end = mitDay(end-1)+T.day;
        this.initMarkings();
        const fieldElem = this.getClass("field");
        fieldElem.style.width = `max(100vw, calc(${(this.end-this.start)/T.min}*var(--min)))`;
        this.initEvents(events);
        this.getClass("field").style.height = `calc(${this.tracks.length}*var(--height))`;
        this.registerListeners();
    }
}
