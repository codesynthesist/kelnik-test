<template>
  <section class="flats">
    <div class="flats__list">
      <h1>Квартиры</h1>
    </div>
    <div class="flats__filter">

    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Квартиры',
});

</script>

<style scoped lang="scss">
  .flats {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 48px 54px;

    &__list {
    }

    &__filter {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
</style>
