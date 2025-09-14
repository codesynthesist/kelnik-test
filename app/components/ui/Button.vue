<template>
  <button
      type="button"
      class="button btn-primary"
      :class="`button--type--${props.type}`"
      :disabled="props.disabled"
      @click="emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  disabled?: boolean;
  type?: 'primary' | 'text';
}

interface Emits {
  click: [];
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  type: 'primary',
});
const emit = defineEmits<Emits>();
</script>

<style scoped lang="scss">
@use '@/assets/css/vars.scss' as *;

.button {
  display: inline-flex;
  align-items: center;
  min-width: 140px;
  height: 40px;
  padding: 8px 24px;
  border-radius: 20px;
  font-size: 15px;
  line-height: 22px;
  font-weight: 500;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    color: $color-text-secondary;
  }

  &--type {
    &--primary {
      border: 1px solid rgba($color-text-primary, 20%);
      background-color: $color-white;
    }
    &--text {
      border: none;
      background-color: transparent;
      padding: 8px 16px;

    }
  }
}
</style>
