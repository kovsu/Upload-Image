<script setup lang="ts">
import { computed, ref } from "@vue/reactivity";
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);

let times = ref(0);
</script>

<template>
  <header class="header">
    <div class="header__logo">
      <p>Upload Image</p>
    </div>
    <div class="header__operations">
      <button class="header__btn">
        <a href="https://github.com/kovsu/upload-image" target="_blank">
          <font-awesome-icon icon="fa-brands fa-github" />
        </a>
      </button>
      <button
        @click="
          toggleDark();
          times++;
        "
        class="header__btn"
      >
        <font-awesome-icon icon="fa-solid fa-mountain" class="header__btn-1" />
        <div
          class="rotate__btn"
          :style="{ transform: `rotate(-${180 * times}deg)` }"
        >
          <font-awesome-icon icon="fa-solid fa-sun" class="header__btn-2" />
          <font-awesome-icon icon="fa-solid fa-moon" class="header__btn-3" />
        </div>
      </button>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  padding: 2rem 8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(128, 128, 128, 0.3);

  &__operations {
    display: flex;
    gap: 2rem;
  }

  &__logo {
    font-size: 1.8rem;
    font-weight: 700;
  }

  &__btn {
    padding: 1rem 1rem 0 0;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1.8em;
    position: relative;

    cursor: pointer;
    overflow: hidden;

    a {
      color: inherit;
    }

    &-3 {
      transform: rotate(180deg);
    }
  }
}

.rotate__btn {
  position: absolute;
  z-index: -1;
  top: 0.8rem;
  left: 0.8rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  font-size: 0.8em !important;
  transition: all 0.5s;
}
</style>
