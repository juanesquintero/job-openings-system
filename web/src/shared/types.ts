export interface IMessage {
    id: number;
    text: string;
    sender?: Sender;
    time?: Date;
}

export type Sender = "user" | "bot";

export interface IGet {
    endpoint: string;
}

export interface IPost extends IGet {
    body: Record<string, string | number | boolean | Date | null | undefined> | unknown;
}
