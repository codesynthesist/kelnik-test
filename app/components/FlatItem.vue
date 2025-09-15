<template>
  <article class="flat" tabindex="0" :aria-label="description">
      <div class="flat__image">
        <img
            :src="`/img/${image}`"
            :alt="`${rooms}-комнатная квартира №${num}`"
            class="flat-item__schema"
        />
      </div>
      <div class="flat__info">
        <h3 class="flat__title">{{ rooms }}-комнатная №{{ num }}</h3>
        <dl class="flat__parameters">
          <div class="flat__square">
            <dt class="sr-only">Площадь</dt>
            <dd>{{ square }}<span class="mobile-only"> м<sup>2</sup></span></dd>
          </div>
          <div class="flat__floor">
            <dt class="sr-only">Этаж</dt>
            <dd>{{ floor }} <span>из {{ totalFloors }} <span class="mobile-only">этаж</span></span></dd>
          </div>
          <div class="flat__price">
            <dt class="sr-only">Цена</dt>
            <dd>{{ price.toLocaleString() }} <span>₽</span></dd>
          </div>
        </dl>
      </div>
  </article>
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

const description = computed(() =>
    `${rooms}-комнатная квартира №${num}, ${square} квадратных метров, ${floor} этаж из ${totalFloors}, цена ${price} рублей`
);
</script>

<style scoped lang="scss">
@use "@/assets/css/vars.scss" as *;
@use "@/assets/css/mixins.scss" as *;

.flat {
  display: grid;
  width: 100%;
  gap: 20px;
  padding: 16px 24px;
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

    @include respond(desktop) {
      line-height: inherit;
    }
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
}

</style>
