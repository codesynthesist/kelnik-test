export interface Flat {
    id: string,
    num: number,
    rooms: number,
    square: number,
    floor: number,
    totalFloors: number,
    price: number,
    image?: string,
}

export type Sort = {
    field: SortableStrings,
    direction: 'asc' | 'desc',
};

export type Filter = {
    rooms: number[],
    price: [number, number],
    square: [number, number],
}

export type Directions = 'asc' | 'desc';
export type SortableStrings = keyof Pick<Flat, 'square' | 'floor' | 'price'>;

