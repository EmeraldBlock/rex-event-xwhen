export function mod(a: number, b: number) {
    return (a%b+b)%b;
}

export function clamp(x: number, min: number, max: number) {
    return Math.max(min, Math.min(max, x));
}

export const offset = -4;

const s = 1000;
const min = 60 * s;
const hr = 60 * min;
const day = 24 * hr;
export const T = { s, min, hr, day };

export function mitTime(time: number) {
    return time+offset*hr;
}

export function mitDay(time: number) {
    return time - mod(time+offset*hr, day);
}

export function time12(time: number) {
    const dday = time % day;
    const dhour = time % hr;
    const dmin = time % min;
    const hour = (dday-dhour)/hr;
    const minute = (dhour-dmin)/min;
    return `${mod(hour-1, 12)+1}:${`${minute}`.padStart(2, "0")} ${hour<12 ? "AM" : "PM"}`;
}

export const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
