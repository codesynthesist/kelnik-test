<template>
  <div class="checkbox">
    <input
        type="checkbox"
        v-model="isChecked"
        :id="`checkbox-${props.value}`"
        :value="props.value"
        :disabled="props.disabled"
    />
    <label :for="`checkbox-${props.value}`">
      <slot></slot>
    </label>
  </div>
</template>

<script setup lang="ts">
interface Props {
  value: number;
  label?: string;
  disabled?: boolean;
}

const modelValue = defineModel<number[]>({
  default: () => [],
});

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const isChecked = computed({
  get: () => modelValue.value.includes(props.value),
  set: (checked: boolean) => {
    let newValue = [...modelValue.value];

    if (checked) {
      if (!newValue.includes(props.value)) {
        newValue.push(props.value);
      }
    } else {
      newValue = newValue.filter(v => v !== props.value);
    }

    modelValue.value = newValue;
  },
});
</script>

<style scoped lang="scss">
@use '@/assets/css/vars.scss' as *;

.checkbox {
  display: flex;
  align-items: center;

  input[type="checkbox"] {
    width: 0;
    height: 0;
    position: absolute;
    opacity: 0;

    &:checked + label {
      background-color: $color-green;
      color: $color-white;
      box-shadow: 0 0 6px 0 #95D0A1;
    }

    &:disabled + label {
      cursor: not-allowed;
      color: $color-text-secondary;
      background-color: $color-green-light;
      cursor: not-allowed;
    }

    & + label {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background-color: $color-white;
      line-height: 1em;
      cursor: pointer;
      user-select: none;
    }
  }


}
</style>
