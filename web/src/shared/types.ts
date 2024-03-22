export interface IMessage {
    id: number;
    text: string;
    sender?: Sender;
    time?: Date;
}

export type Sender = "user" | "bot";

export interface IPost {
    endpoint: string;
    body: Record<string, string | number | boolean | Date | null | undefined> | unknown;
}
