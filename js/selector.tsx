import { Signal } from "./signal";

export class Selector {
    public values = new Set<string>();
    public signal = new Signal();

    constructor(public element: HTMLElement) {}

    init(options: string[], colors: Map<string, string>) {
        this.element.replaceChildren(
            <output tabindex="0">
                {...[...options.map(option => {
                    const input = <input type="checkbox" id={option} /> as HTMLInputElement;
                    input.addEventListener("change", (event) => {
                        if (input.checked) {
                            this.values.add(option);
                        } else {
                            this.values.delete(option);
                        }
                        this.signal.fire();
                    });
                    return <label tabindex="-1" style={`--color: ${colors.get(option) ?? "white"}`}>
                        {input}
                        {option}
                    </label>;
                }), <span>+</span>]}
            </output>,
            <div class="options" tabindex="0">
                {...options.map(option => <label for={option} style={`--color: ${colors.get(option) ?? "white"}`}>
                    {option}
                </label>)}
            </div>
        );
    }

    match(value: string) {
        if (this.values.size === 0) return true;
        return this.values.has(value);
    }
}
