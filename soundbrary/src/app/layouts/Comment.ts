
export interface Comment {
    _id?: string;
    userId: string;
    idParent: string;
    text: string;
    date: Date;
}
