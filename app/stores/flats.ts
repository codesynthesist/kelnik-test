import type {  Flat, Filter, Sort } from '@/types';
import { getFlatsFromDb, filterFn, sortFn } from './utils/flats';

type FlatsMeta = Filter & {
    totalItems: number,
    perPage: number,
}

const filterDefault: Filter = {
    rooms: [],
    price: [3_500_000, 7_500_000],
    square: [33, 89],
};

export const useFlatsStore = defineStore('flats', () => {
    const isLoading = ref<boolean>(false);
    const flats = ref<Flat[]>([]);
    const flatsMeta = reactive<FlatsMeta>({
        price: [0, 0],
        square: [0, 0],
        rooms: [],
        totalItems: 0,
        perPage: 10,
    });
    const filter = reactive<Filter>({ ...filterDefault });
    const sort = reactive<Sort>({
        field: 'price',
        direction: 'asc',
    });
    const page = ref<number>(1);

    const visibleFlats: ComputedRef<Flat[]>= computed(() => {
        return flats.value.slice(0, page.value * flatsMeta.perPage);
    });
    const isNextPageAvailable = computed(() => {
        return (page.value * flatsMeta.perPage) <= flats.value.length;
    })

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
            flatList = flatList.filter(filterFn(filter));


            // имитация загрузки и применение пагинации
            setTimeout(() => {
                flats.value = flatList;
                isLoading.value = false;
            }, 1500);
        } catch (error) {
            console.log(error);
            flats.value = [];

            isLoading.value = false;
        }
    };

    const sortFlats = async () => {
        flats.value = flats.value.sort(sortFn(sort.field, sort.direction));
    }

    const resetFilter = () => {
        // filterInitialized.value = true;
        filter.price = flatsMeta.price;
        filter.square = flatsMeta.square;
        filter.rooms = flatsMeta.rooms;
    };

    watch(filter, async () => {
        await getFlats();
    },
    { deep: true },
    );

    return {
        isLoading,
        flats,
        visibleFlats,
        flatsMeta,
        filter,
        sort,
        page,
        isNextPageAvailable,
        sortFlats,
        getFlats,
        resetFilter,
    };
}/*, {
    persist: {
        storage: piniaPluginPersistedstate.localStorage(),
        pick: ['filter', 'sort'],
    },
}*/);

