<template>
  <div class="slider">
    <div class="slider__label">
      <slot name="label">{{ props.label }}</slot>
    </div>
    <div class="slider__value-wrapper">
      <div class="slider__value">
        от<span>{{ modelValue[0].toLocaleString() }}</span>
      </div>
      <div class="slider__value">
        до<span>{{ modelValue[1].toLocaleString() }}</span>
      </div>
    </div>

    <div class="slider__range" :class="{ 'slider__range--disabled': props.disabled }">
      <Range
          v-model="modelValue"
          :min="min"
          :max="max"
          :step="props.step"
          :arial-label="props.label"
          range-highlight
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Range } from 'vue-range-multi';
import 'vue-range-multi/style.css';

interface Props {
  min: number;
  max: number;
  step?: number;
  label?: string;
  disabled?: boolean
}

interface Emits {
  change: [value: [number, number]];
}

const modelValue = defineModel<[number, number]>({
  default: () => [0, 0],
});

const props = withDefaults(defineProps<Props>(), {
  step: 1,
  disabled: false,
});
const emit = defineEmits<Emits>();

const min = computed(() => {
  return Math.floor(props.min / props.step) * props.step;
});

const max = computed(() => {
  return Math.ceil(props.max / props.step) * props.step;
});

watch(modelValue, (val) => {
  emit('change', val);
});
</script>

<style scoped lang="scss">
@use '@/assets/css/vars.scss' as *;

.slider {
  width: 100%;

  &__range {
    &--disabled {
      pointer-events: none;
      cursor: not-allowed;
    }
  }

  &__label {
    font-size: 13px;
    margin-bottom: 8px;
  }

  &__value-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  &__value {
    width: 50%;
    font-size: 16px;
    color: $color-text-secondary;

    span {
      color: $color-text-primary;
      font-weight: 600;
      padding-left: 8px;
    }
  }
}
</style>

<style lang="scss">
@use '@/assets/css/vars.scss' as *;

.m-range {
  padding: 6px 0;

  &-theme {
    --c-primary: #{$color-green};
    --c-fill: #cbdcd3;
    --c-fill-thumb: var(--c-primary);
  }

  &-small {
    height: 3px;
  }

  &-thumb-circle {
    width: 14px;
    height: 14px;
    top: -6px;
  }
}

.slider__range--disabled {
  .m-range {
    &-thumb,
    &-thumb-circle,
    &-highlight {
      background-color: $color-green-light;
      cursor: not-allowed;
    }

    &-thumb-circle {
      border-color: $color-green-light;
      cursor: not-allowed;
    }
  }
}

</style>
