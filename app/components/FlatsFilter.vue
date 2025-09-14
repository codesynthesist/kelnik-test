<template>
  <section class="filter">
    <div class="filter__field filter__rooms">
      <UiCheckbox
          v-for="i of flatsMeta.rooms"
          v-model="rooms"
          :value="i"
          :disabled="isLoading"
      >
        {{ i }}к
      </UiCheckbox>
    </div>

    <div class="filter__field">
      <UiRange
          :model-value="filter.price"
          :min="flatsMeta.price[0]"
          :max="flatsMeta.price[1]"
          :step="100_00"
          :disabled="isLoading"
          label="Стоимость квартиры, ₽"
          @change="(val) => onRangeChange(val, 'price')"
      />
    </div>

    <div class="filter__field">
      <UiRange
          :model-value="filter.square"
          :min="flatsMeta.square[0]"
          :max="flatsMeta.square[1]"
          :step="1"
          :disabled="isLoading"
          @change="(val) => onRangeChange(val, 'square')"
      >
        <template #label>Площадь, м<sup>2</sup></template>
      </UiRange>
    </div>

    <div class="filter__field">
      <UiButton
          v-if="isFiltered"
          type="text"
          class="filter__reset-button"
          :disabled="isLoading"
          @click="resetFilter"
      >
        Сбросить параметры
        <XMark/>
      </UiButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import debounce from 'lodash/debounce';
import deepEqual from 'fast-deep-equal';
import { useFlatsStore } from '@/stores/flats';
import XMark from '@/assets/img/icons/xmark.svg';

const flatStore = useFlatsStore();

const { resetFilter } = flatStore;
const { flatsMeta, filter, isLoading } = storeToRefs(flatStore);

const isFiltered: ComputedRef<boolean> = computed(() => {
  return !deepEqual({
    rooms: flatsMeta.value.rooms,
    square: flatsMeta.value.square,
    price: flatsMeta.value.price,
  }, toRaw(filter.value));
});

const onRangeChange = debounce((val: [number, number], field: 'price' | 'square') => {
  filter.value[field] = val;
}, 500);

const rooms = computed({
  get: () => filter.value.rooms,
  set: (val: number[]) => {
    filter.value.rooms = [...val].sort((a, b) => a - b);
  },
});
</script>

<style scoped lang="scss">
@use "@/assets/css/mixins.scss" as *;

.filter {
  position: sticky;
  top: 48px;
  padding: 20px;
  border-radius: 10px;
  background-color: #e3f4e5;

  &__field {
    width: 280px;

    @include respond(desktop) {
      width: 320px;
    }
  }

  & > *:not(:last-child) {
    margin-bottom: 24px;
  }

  &__rooms {
    display: flex;

    & > *:not(:last-child) {
      margin-right: 16px;
    }
  }

  &__reset-button {
     svg {
       width: 8px;
       height: 8px;
       margin-left: 8px;
       margin-top: 3px;
    }
  }
}
</style>
