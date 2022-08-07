<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { reactive, ref } from "vue";
import { uploadImage } from "../api/req";

enum Status {
  Loading,
  Uploading,
  Compeleted,
}

interface ImgFile {
  file: File;
  url: string;
  status: Status;
}

let show = ref(false);
let images = reactive<ImgFile[]>([]);

function fileShow() {
  // let fr = new FileReader();
  if (images.length > 4) {
    alert("一次最多传五张图片");
    return;
  }
  const cover = document.querySelector("#select") as HTMLInputElement;
  const file = cover!.files![0];
  const url = window.URL.createObjectURL(file);
  show.value = true;
  const obj = {
    file,
    url,
    // 0 加载， 1 上传中， 2 完成
    status: Status.Loading,
  };
  images.push(obj);
}

function remove(index: number) {
  images.splice(index, 1);
}

async function upload(img: ImgFile) {
  const file = img.file;
  img.status = Status.Uploading;
  const data = await uploadImage(file);
  console.log(data);
  if (data.statusCode === 200) {
    img.status = Status.Compeleted;
  }
}

async function uploadAll() {
  // 这个遍历方法 是从第一张开始，前面的完成，才会开始后面的传输，
  // 如果使用 forEach 的话就会一起发送请求，我这里希望的效果是 前者。
  for (let item of images) {
    await upload(item);
  }
}

// 如果全部上传完成，点击按钮激活 disabled
let clean = computed(() => {
  for (let item of images) {
    if (item.status !== Status.Compeleted) {
      return false;
    }
  }
  return true;
});
</script>

<template>
  <main class="container">
    <label for="select"></label>
    <input
      type="file"
      id="select"
      accept="image/png, image/jpeg, image/jpg"
      @change="fileShow"
    />
    <font-awesome-icon
      icon="fa-solid fa-cloud-arrow-up"
      class="container__bg"
    />
    <p class="container__des">Upload Your Image</p>
  </main>
  <div class="showBox" v-show="show">
    <div class="item" v-for="(img, index) in images" :key="index">
      <img alt="" class="showImg" :src="img.url" />
      <button @click="remove(index)">
        <font-awesome-icon icon="fa-solid fa-minus" />
      </button>
      <div class="gray" v-show="img.status > 0">
        <div class="circle" v-if="img.status === 1"></div>
        <font-awesome-icon icon="fa-solid fa-check" v-else />
      </div>
    </div>
  </div>
  <button class="upload_btn" @click="uploadAll" :disabled="clean">
    <font-awesome-icon icon="fa-solid fa-upload" />上传
  </button>
</template>

<style lang="scss">
.upload_btn {
  display: block;
  letter-spacing: 2px;
  padding: 1rem 2rem;
  cursor: pointer;
  margin: 2rem auto;
  background: transparent;

  font-size: 1.5em;
  border: none;
  outline: none;

  &:hover {
    box-shadow: 0px 0px 10px rgba(128, 128, 128, 0.15);
  }

  &[disabled] {
    cursor: not-allowed;
  }

  svg {
    margin-right: 1rem;
  }
}

.showBox {
  width: 85%;
  height: auto;
  margin: 0 auto;
  padding: 2rem;

  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.item {
  position: relative;

  .gray {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);

    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(65, 189, 65);
    font-size: 4em;
  }

  &:hover button {
    opacity: 1;
  }

  button {
    cursor: pointer;
    background: #f11;
    padding: 0.3rem 0.5rem;
    border-radius: 50%;
    border: none;
    outline: none;
    position: absolute;
    z-index: 1;
    top: 1rem;
    right: 1rem;
    opacity: 0;
    transition: all 0.2s;
    color: white;
  }
}

.showImg {
  width: 24rem;
  height: 20rem;
  object-fit: cover;
}

.container label {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
}

#select {
  opacity: 0;
  visibility: hidden;
}

.container {
  position: relative;
  width: 80%;
  height: 40rem;
  border-radius: 1rem;
  border: 2px dashed rgba(128, 128, 128, 0.3);
  margin: 2rem auto;
  overflow: hidden;

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

.circle {
  border: 3px solid hsla(180, 14%, 67%, 0.2);
  border-top-color: #f4f4f4;
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
