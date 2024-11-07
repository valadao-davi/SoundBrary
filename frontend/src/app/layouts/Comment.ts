
export interface Coment {
    _id?: string;
    userName: string;
    idParent?: string;
    idParentAwnser?: string;
    text: string;
    date: Date | string;
}
