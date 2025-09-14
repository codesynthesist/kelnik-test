<template>
  <section class="flats">
    <div class="flats__list">
      <h1>Квартиры</h1>
      <FlatList/>
    </div>
    <div class="flats__filter">
      <FlatsFilter/>
    </div>
    <teleport to="body">
      <GoTopButton/>
    </teleport>
  </section>
</template>

<script setup lang="ts">
import { useFlatsStore } from '@/stores/flats';
import GoTopButton from '~/components/ui/GoTopButton.vue';

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
    padding: 96px 80px;
  }

  &__list {
    width: 100%;
  }
}
</style>
