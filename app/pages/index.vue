<template>
  <section class="flats">
    <div class="flats__list">
      <h1>Квартиры</h1>
      <FlatList/>
    </div>
    <div class="flats__filter">
      <FlatsFilter/>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useFlatsStore } from '@/stores/flats';

const flatsStore = useFlatsStore();

const { getFlats, resetFilter } = flatsStore;

await useAsyncData('flats', async () => {
  await getFlats();
  resetFilter();
});


definePageMeta({
  title: 'Квартиры',
});
</script>

<style scoped lang="scss">
@use '@/assets/css/mixins.scss' as *;

.flats {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 48px 54px;

  @include respond(desktop) {
    max-width: 1280px;
    margin: 0 auto;
  }

  &__list {
    width: 100%;
  }
}
</style>
