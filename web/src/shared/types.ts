export interface IMessage {
    id: number;
    text: string;
    sender?: Sender;
    time?: Date;
}

export type Sender = "user" | "bot";