// based on https://github.com/mit-dormcon/website/blob/8852806f8e0a2f22b95cc2da34a2b7a343ec69bf/components/t-rex/types.ts

export type TRexAPIResponse = {
    /** The title of the current experience, such as "REX 2023" */
    name: string;
    /** ISO Date string of when the current JSON of events was published */
    published: string;
    events: TRexEvent[];
    dorms: string[];
    tags: string[];
    /** Maps event properties to background colors */
    colors: TRexAPIColors;
    start: string;
    end: string;
};

export type TRexAPIColors = {
    dorms: Record<string, string>;
    tags: Record<string, string>;
};

export type TRexEvent = {
    name: string;
    dorm: string[];
    /** The subcommunity or living group hosting this event, if any */
    group: string | null;
    location: string;
    start: string;
    end: string;
    description: string;
    tags: string[];
    emoji: [],
};
