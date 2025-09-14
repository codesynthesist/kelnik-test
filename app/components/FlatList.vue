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
            @click="onClick"
        >
          S, <span class="hint">м²</span>
        </UiSortButon>
      </div>
      <div>
        <UiSortButon
            field="floor"
            :sort-key="sort.field"
            :sort-direction="sort.direction"
            @click="onClick"
        >
          Этаж
        </UiSortButon>
      </div>
      <div>
        <UiSortButon
            field="price"
            :sort-key="sort.field"
            :sort-direction="sort.direction"
            @click="onClick"
        >
          Цена, <span class="hint">₽</span>
        </UiSortButon>
      </div>
    </div>

    <FlatItem
        v-for="flat of flats"
        :key="flat.id"
        :flat="flat"
        class="flat-list__item"
    />
  </div>
</template>

<script setup lang="ts">
import { useFlatsStore } from '@/stores/flats';
import type { Directions, SortableStrings } from '@/types';

const flatsStore = useFlatsStore();
const { flats,  } = storeToRefs(flatsStore);
const { getFlats, sort } = flatsStore;

const onClick = async (field: string, direction: Directions) => {
  sort = {
    field,
    direction: direction,
  }

  // await getFlats();
}

</script>

<style scoped lang="scss">
@use "@/assets/css/mixins.scss" as *;
.flat-list {
  margin-right: 80px;

  .flat-header {
    display: flex;
    gap: 20px;
    margin-bottom: 12px;
    font-weight: 400;

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
