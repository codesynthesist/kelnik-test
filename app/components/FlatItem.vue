<template>
  <div class="flat">
      <div class="flat__image">
        <img
            :src="`/img/${image}`"
            alt="Схема планировки квартиры"
            class="flat-item__schema"
        />
      </div>
      <div class="flat__info">
        <div class="flat__title"><span>{{ rooms }}-комнатная №{{ num }}</span></div>
        <div class="flat__parameters">
          <div class="flat__square">{{ square }}<span class="hint"> м<sup>2</sup></span></div>
          <div class="flat__floor">{{ floor }} <span>из {{ totalFloors }} <span class="hint">этаж</span></span></div>
          <div class="flat__price">{{ price.toLocaleString() }} <span>₽</span></div>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import type { Flat } from '@/types';

interface Props {
  flat: Flat,
}

const props = defineProps<Props>();

const {
  num,
  rooms,
  square,
  floor,
  totalFloors,
  price,
  image,
} = props.flat;
</script>

<style scoped lang="scss">
@use "@/assets/css/vars.scss" as *;
@use "@/assets/css/mixins.scss" as *;

.flat {
  display: grid;
  width: 100%;
  gap: 20px;
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 6px;
  margin-bottom: 4px;

  grid-template-areas: "info image";
  grid-template-columns: 1fr 80px;

  @include respond(desktop) {
    grid-template-areas: "image info";
    grid-template-columns: 80px 1fr;
    gap: 20px;
    align-items: center;
    border: none;
    border-radius: 0;
    padding: 24px 0 16px;
    border-bottom: 1px solid #e6e6e6;
  }

  &__image  {
    grid-area: image;

    & > img {
      display: block;
      width: 80px;
      height: 80px;
    }
  }

  &__info {
    grid-area: info;
    gap: 20px;

    @include respond(desktop) {
      display: grid;
      grid-template-areas: "title parameters";
      grid-template-columns: 280px 1fr;
    }
  }

  &__parameters {
    grid-area: parameters;
    display: grid;
    grid-template-areas: "square floor price";
    grid-template-columns: 60px 95px 120px;
    gap: 20px;

    @include respond(desktop) {
      grid-template-columns: 80px 100px 120px;
    }
  }

  &__title  {
    grid-area: title;
    font-weight: 500;
    line-height: 20px;
    margin-bottom: 16px;

    @include respond(desktop) {
      display: grid;
      grid-template-columns: 280px;
    }
  }


  &__square {
    grid-area: square;
    font-weight: 500;
    line-height: 8px;
  }

  &__floor  {
    grid-area: floor;
    color: $color-text-primary;
    font-weight: 500;


    span {
      font-weight: 400;
      color: $color-text-secondary;
    }
  }

  &__price  {
    grid-area: price;
    font-weight: 500;
  }

  .flat_floor-hint {
    @include respond(desktop) {
      display: none;
    }
  }
}

</style>
