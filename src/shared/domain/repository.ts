export type ID = string;

export interface Repository<T> {
    get(id: ID): T;
    set(value: T, id?: ID): ID;
}