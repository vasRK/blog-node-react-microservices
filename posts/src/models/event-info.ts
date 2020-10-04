import { BlogPost } from "./blog-post";

export class EventInfo {
    constructor(public type: EventType, public eventData: BlogPost | any) {

    }
}

export enum EventType {
    PostCreated = 1,
    CommentCreate = 2
}