import { Signal } from "./signal";

export class Searcher {
    public values: string[] = [];
    public signal = new Signal();

    constructor (public element: HTMLInputElement) {}

    init() {
        this.element.addEventListener("input", (event) => {
            this.values = this.element.value.trim().split(/\s+/).map(v => v.toLowerCase());
            this.signal.fire();
        });
    }

    match(text: string) {
        const txt = text.toLowerCase();
        return this.values.every(value => txt.includes(value));
    }
}
