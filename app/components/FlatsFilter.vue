<template>
  <section class="filter">
    <div class="filter__field filter__rooms">
      <UiCheckbox
          v-for="i of flatsMeta.rooms"
          v-model="rooms"
          :value="i"
          :disabled="isDisabled(i)"
      >
        {{ i }}к
      </UiCheckbox>
    </div>

    <div class="filter__field">
      <UiRange
          v-model="filter.price"
          :min="flatsMeta.price[0]"
          :max="flatsMeta.price[1]"
          :step="100_00"
          label="Стоимость квартиры, ₽"
      />
    </div>

    <div class="filter__field">
      <UiRange
          v-model="filter.square"
          :min="flatsMeta.square[0]"
          :max="flatsMeta.square[1]"
          :step="1"
      >
        <template #label>Площадь, м<sup>2</sup></template>
      </UiRange>
    </div>

    <div class="filter__field">
<!--      <UiButton-->
<!--          v-if="!isFiltered"-->
<!--          @click="resetFilter"-->
<!--      >-->
<!--        Сбросить параметры-->
<!--      </UiButton>-->
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Flat } from '@/types';
import { useFlatsStore } from '@/stores/flats';
import deepEqual from 'fast-deep-equal';

const flatStore = useFlatsStore();

const { resetFilter } = flatStore;
const { flats, flatsMeta, filter } = storeToRefs(flatStore);



// const isFiltered: ComputedRef<boolean> = computed(() => {
//   return !deepEqual(toRaw(filterDefault), toRaw(filter.value));
// });

const isDisabled = (rooms: number): boolean => {
  return flats.value.filter((item: Flat) => item.rooms === rooms).length === 0;
};

const rooms = computed({
  get: () => filter.value.rooms,
  set: (val: number[]) => {
    filter.value.rooms = [...val].sort((a, b) => a - b);
  },
});


// const resetFilter = () => {
//   filter.value = { ...filterDefault };
// };
//
// watchEffect(async () => {
//   await getFlats(filterForm.value);
// });

</script>

<style scoped lang="scss">
.filter {
  padding: 20px;
  border-radius: 10px;
  background-color: #e3f4e5;

  & > *:not(:last-child) {
    margin-bottom: 24px;
  }

  &__rooms {
    display: flex;

    & > *:not(:last-child) {
      margin-right: 16px;
    }
  }
}
</style>
