export class Signal<T extends unknown[] = []> {
    public listeners = new Set<(...args: T) => void>();

    constructor() {}

    add(listener: (...args: T) => void) {
        this.listeners.add(listener);
    }

    fire(...args: T) {
        for (const listener of this.listeners) {
            listener(...args);
        }
    }
}
