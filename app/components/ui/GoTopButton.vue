<template>
  <teleport to="body">
    <UiButton
        class="top-button"
        v-show="isVisible"
        @click="goTop"
    >
      <ArrowUp/>
    </UiButton>
  </teleport>
</template>

<script setup lang="ts">
import ArrowUp from '~/assets/img/icons/arrow-up.svg';

const isVisible = ref<boolean>(false);

const scrollHandler = () => {
  isVisible.value = window.scrollY > 150;
};

const goTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  window.addEventListener('scroll', scrollHandler);
});

onUnmounted(() => {
  window.removeEventListener('scroll', scrollHandler);
});
</script>

<style scoped lang="scss">
@use '@/assets/css/vars.scss' as *;

.top-button {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: auto;
  width: 40px;
  height: 40px;
  padding: 0;
  bottom: 32px;
  right: 32px;
  border: none;
  border-radius: 50%;
  background-color: #97d1a2;
  z-index: 1;

  svg {
    color: $color-white;
    height: 14px;
  }
}

</style>
