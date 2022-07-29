<script setup lang="ts">
import { ref } from "vue";

const url = ref("1123");
</script>

<template>
  <main class="container">
    <font-awesome-icon
      icon="fa-solid fa-cloud-arrow-up"
      class="container__bg"
    />
    <p class="container__des">Upload Your Image</p>
  </main>
  <div class="show">
    <span>http://</span>
    <p v-if="url">{{ url }}</p>
  </div>
</template>

<style lang="scss">
.container {
  width: 80%;
  height: 40rem;
  border-radius: 1rem;
  border: 2px dashed rgba(128, 128, 128, 0.3);
  margin: 2rem auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__bg {
    font-size: 8em;
    color: #eee;
  }

  &__des {
    font-size: 1.6rem;
    font-weight: 500;
  }
}

.show {
  width: 60%;
  height: 4rem;
  border: 1px solid rgba(128, 128, 128, 0.3);
  border-radius: 5px;
  margin: 0 auto;
  display: flex;
  gap: 2rem;

  span {
    display: block;
    padding: 0 2rem;
    border-right: 1px solid rgba(128, 128, 128, 0.3);
    line-height: 4rem;
  }

  p {
    line-height: 4rem;
    cursor: pointer;
  }
}
</style>
