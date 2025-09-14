import type { Directions, Flat, Filter, Sort, SortableStrings } from '@/types';
import { getFlatsFromDb, filterFn, sortFn } from './utils/flats';

type FlatsMeta = Filter & {
    totalItems: number,
    perPage: number,
}

const filterDefault: Filter = {
    rooms: [1],
    price: [3_500_000, 7_500_000],
    square: [33, 89],
};

export const useFlatsStore = defineStore('flats', () => {
    const isLoading = ref<boolean>(false);
    const flats = ref<Flat[]>([]);
    const flatsMeta = reactive<FlatsMeta>({
        price: [0, 1],
        square: [0, 1],
        rooms: [],
        totalItems: 0,
        perPage: 10,
    });
    const filter = reactive<Filter>({ ...filterDefault });
    const sort = reactive<Sort>({
        field: 'price',
        direction: 'asc',
    });
    const pagination = ref<number>(1);

    const getFlats = async () => {
        isLoading.value = true;

        try {
            const {
                flats: items,
                total: totalItems,
                minPrice,
                maxPrice,
                minSquare,
                maxSquare,
                rooms,
            } = await getFlatsFromDb();

            let flatList = items;

            // метаданные для фильтров и пагинации
            flatsMeta.totalItems = totalItems;
            flatsMeta.price = [minPrice, maxPrice];
            flatsMeta.square = [minSquare, maxSquare];
            flatsMeta.rooms = rooms;

            // фильтрация
            flatList.filter(filterFn(filter));

            // сортировка
            flatList.sort(sortFn(sort.field, sort.direction));

            // имитация загрузки и применение пагинации
            setTimeout(() => {
                flats.value = flatList.slice(0, pagination.value * flatsMeta.perPage);
            }, 1500);
        } catch (error) {
            console.log(error);
            flats.value = [];
        } finally {
            isLoading.value = false;
        }
    };

    const resetFilter = () => {
        filter.price = flatsMeta.price;
        filter.square = flatsMeta.square;
        filter.rooms = flatsMeta.rooms;
    }

    watch([filter, sort], () => {
        getFlats();
    })

    return {
        flats,
        flatsMeta,
        filter,
        sort,
        getFlats,
        resetFilter,
    };
}/*, {
    persist: {
        storage: piniaPluginPersistedstate.localStorage(),
        pick: ['filter', 'sort'],
    },
}*/);

