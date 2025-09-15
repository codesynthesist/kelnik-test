<template>
  <section class="flat-list">
    <client-only>
      <header
          v-if="visibleFlats.length"
          class="flat-header"
      >
        <div class="desktop-only">Планировка</div>
        <div class="desktop-only">Квартира</div>
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
      </header>
    </client-only>

    <ul class="flat-list__list">
      <li v-if="isLoading">
        Загрузка...
      </li>
      <li v-else-if="!visibleFlats.length">
        Нет данных по текущему запросу...
      </li>

      <li
          v-else
          v-for="flat of visibleFlats"
          :key="flat.id"
      >
        <FlatItem :flat="flat"/>
      </li>
    </ul>

    <UiButton
        v-show="!isLoading && visibleFlats.length && isNextPageAvailable"
        :disabled="isListLoading"
        aria-label="Показать больше квартир"
        @click="loadMore"
    >
      Показать еще
    </UiButton>
  </section>
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
  }, 1500);
};

</script>

<style scoped lang="scss">
@use "@/assets/css/vars.scss" as *;
@use "@/assets/css/mixins.scss" as *;

.flat-list {
  margin-right: 80px;

  &__list {
    margin-bottom: 24px;
    list-style: none;

    @include respond(desktop) {
      margin-bottom: 48px;
    }

    & > {
      list-style: none;
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
