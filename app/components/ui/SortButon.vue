<template>
  <button
      type="button"
      class="sort-button"
      :disabled="props.disabled"
      :class="className"
      @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { type Directions } from '@/types';

interface Props {
  field: string
  sortKey: string | null,
  sortDirection: Directions,
  disabled?: boolean,
}

interface Emits {
  click: [field: string, direction: Directions];
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});
const emit = defineEmits<Emits>();

const isActive: ComputedRef<boolean> = computed(() => props.field === props.sortKey);
const className = computed(() => [
  {
    'sort-button--active': isActive.value,
  },
  `sort-button--direction--${props.sortDirection}`,
]);

const getDirection = (): Directions => {
  return isActive.value
      ? props.sortDirection === 'desc'
          ? 'asc'
          : 'desc'
      : 'asc';
};

const onClick = () => {
  emit('click', props.field, getDirection());
};
</script>

<style scoped lang="scss">
@use "@/assets/css/vars" as *;

$defaultBg: rgba($color-text-primary, 40%);

@mixin direction--asc {
  &::before {
    background-color: $color-green;
  }

  &::after {
    background-color: $defaultBg;
  }
}

@mixin direction--desc {
  &::before {
    background-color: $defaultBg;
  }

  &::after {
    background-color: $color-green;
  }
}

.sort-button {
  position: relative;
  border: none;
  padding-right: 14px;
  background-color: transparent;
  cursor: pointer;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 7px;
    height: 5px;
    right: 0;
    top: 3px;
    mask: url("@/assets/img/icons/chevron-up.svg") no-repeat center;
    background-color: $defaultBg;
  }

  &::after {
    transform: rotate(180deg);
    top: initial;
    bottom: 1px;
  }

  &:hover {
    color: $color-green;
    @include direction--asc();
  }

  &:disabled {
    color: $color-text-secondary;
    cursor: not-allowed;

    &::before,
    &::after {
      cursor: not-allowed;
    }
  }

  &--active {
    color: $color-green;

    &.sort-button--direction {
      &--asc {
       @include direction--asc();

        &:hover {
          @include direction--desc();
        }
      }

      &--desc {
        @include direction--desc();

        &:hover {
          @include direction--asc();
        }
      }
    }
  }
}
</style>
