import type { Directions, Flat, SortableStrings, Filter } from '@/types';

const getMinMax = (flats: Flat[], field: keyof Pick<Flat, 'price' | 'square'>): [number, number] => {
    const sorted = flats
        .map((flat: Flat) => flat[field])
        .sort((a: number, b: number) => a - b);

    return [
        sorted.at(0) ?? 0,
        sorted.at(-1) ?? 0,
    ];
};

export const getFlatsFromDb = async ()  => {
    const flats = await $fetch<Flat[]>('/data/flats.json');

    return {
        flats: flats,
        total: flats.length,
        minPrice: getMinMax(flats, 'price')[0],
        maxPrice: getMinMax(flats, 'price')[1],
        minSquare: getMinMax(flats, 'square')[0],
        maxSquare: getMinMax(flats, 'square')[1],
        rooms: flats
            .reduce((acc: number[], f: Flat) => acc.includes(f.rooms) ? acc : [ ...acc, f.rooms ], [])
            .sort((a, b) => a - b),
    }
}

export const filterFn = (filter: Filter) => {
    return (item: Flat) => {
        const isRooms = filter.rooms.includes(item.rooms);
        const isPrice = item.price >= filter.price[0] && item.price <= filter.price[1];
        const isSquare = item.square >= filter.square[0] && item.square <= filter.square[1];

        return isRooms && isPrice && isSquare;
    }
};

export const sortFn = (field: SortableStrings, direction: Directions) => {
    return (a: Flat, b: Flat) => direction === 'asc'
        ? a[field] - b[field]
        : b[field] - a[field];
};
