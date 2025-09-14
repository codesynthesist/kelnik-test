<template>
  <button
      type="button"
      class="button btn-primary"
      :disabled="props.disabled"
      @click="emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  disabled?: boolean;
}

interface Emits {
  click: [];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
</script>

<style scoped lang="scss">
@use '@/assets/css/vars.scss' as *;

.button {
  display: inline-flex;
  min-width: 140px;
  height: 40px;
  padding: 8px 24px;
  border: 1px solid rgba($color-text-primary, 20%);
  border-radius: 20px;
  background-color: $color-white;
  font-size: 15px;
  line-height: 22px;
  font-weight: 500;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    color: $color-text-secondary;
  }
}
</style>
