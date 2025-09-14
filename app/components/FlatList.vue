<template>
  <div class="flat-list">
    <div class="flat-header">
      <div class="mobile-hidden">Планировка</div>
      <div class="mobile-hidden">Квартира</div>
      <div>
        <UiSortButon
            field="square"
            :sort-key="sort.field"
            :sort-direction="sort.direction"
            :disabled="isLoading"
            @click="onSort"
        >
          S, <span class="hint">м²</span>
        </UiSortButon>
      </div>
      <div>
        <UiSortButon
            field="floor"
            :sort-key="sort.field"
            :sort-direction="sort.direction"
            :disabled="isLoading"
            @click="onSort"
        >
          Этаж
        </UiSortButon>
      </div>
      <div>
        <UiSortButon
            field="price"
            :sort-key="sort.field"
            :sort-direction="sort.direction"
            :disabled="isLoading"
            @click="onSort"
        >
          Цена, <span class="hint">₽</span>
        </UiSortButon>
      </div>
    </div>

    <div class="flat-list__items">
      <template v-if="isLoading">
        Загрузка...
      </template>

      <FlatItem
          v-else
          v-for="flat of visibleFlats"
          :key="flat.id"
          :flat="flat"
          class="flat-list__item"
      />
    </div>

    <UiButton
        v-show="!isLoading && visibleFlats.length && isNextPageAvailable"
        :disabled="isListLoading"
        @click="loadMore"
    >
      Показать еще {{ flatsMeta.perPage }}
    </UiButton >
  </div>
</template>

<script setup lang="ts">
import { useFlatsStore } from '@/stores/flats';
import type { Directions, SortableStrings } from '@/types';

const flatsStore = useFlatsStore();
const { isLoading, flatsMeta, visibleFlats, sort, page, isNextPageAvailable } = storeToRefs(flatsStore);
const { sortFlats } = flatsStore;

const isListLoading = ref<boolean>(false);

const onSort = async (field: string, direction: Directions) => {
  sort.value.field = field as SortableStrings;
  sort.value.direction = direction;

  await sortFlats();
};

const loadMore = () => {
  isListLoading.value = true;

  setTimeout(() => {
    page.value++;
    isListLoading.value = false;
  }, 1500)
}

</script>

<style scoped lang="scss">
@use "@/assets/css/vars.scss" as *;
@use "@/assets/css/mixins.scss" as *;

.flat-list {
  margin-right: 80px;

  &__items {
    margin-bottom: 24px;

    @include respond(desktop) {
      margin-bottom: 48px;
    }
  }

  .flat-header {
    display: flex;
    gap: 20px;
    margin-bottom: 12px;
    font-weight: 400;
    background-color: $color-white;

    @include respond(desktop) {
        display: grid;
        grid-template-areas: "image title square floor price";
        grid-template-columns: 80px 280px 80px 100px 120px;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid #e6e6e6;
    }
  }
}
</style>
