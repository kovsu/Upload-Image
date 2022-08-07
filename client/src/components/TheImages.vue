<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { deleteImage, getAll } from "../api/req";
import { baseUrl } from "../api/config";
import { computed } from "@vue/reactivity";
// 图片的访问路径是 ip + images/图片名
let images = reactive<
  {
    name: string;
    url: string;
    time: string;
  }[]
>([]);
const prefix = baseUrl + "/images/";

function formatTime(item: string) {
  const arr = item.split("-");
  const timestamp = +arr[arr.length - 1].split(".")[0];
  const time =
    new Date(timestamp).getFullYear() +
    "-" +
    (new Date(timestamp).getMonth() + 1) +
    "-" +
    new Date(timestamp).getDate();
  return time;
}

async function getData() {
  const data: string[] = await getAll();
  data.forEach((item) => {
    const time = formatTime(item);
    const obj = {
      name: item,
      url: prefix + item,
      time,
    };
    images.push(obj);
  });
}

onMounted(async () => {
  await getData();
});

let showImages = computed(() => {
  const res: {
    [key: string]: string[];
  } = {};
  for (let item of images) {
    if (res.hasOwnProperty(item.time)) {
      res[item.time].push(item.url);
    } else {
      res[item.time] = [item.url];
    }
  }
  return res;
});

function copy(str: string) {
  navigator.clipboard.writeText(str);
  alert("复制成功");
}

async function deleteImageByName(str: string) {
  const arr = str.split("/");
  const name = arr[arr.length - 1];
  const res = await deleteImage(name);
  console.log(res);
  if ((res.statusCode = 200)) {
    alert("Sucessfully deleted");
    location.reload();
  }
}
</script>

<template>
  <main class="images__container-load" v-if="images.length === 0">
    <p>loading ...</p>
    <p
      style="font-size: 12px; color: rgba(128, 128, 128, 0.5); margin-top: 10px"
    >
      如果刷新之后，长时间还是 loading .. 说明你没有图片在服务器。
    </p>
  </main>
  <main class="images__container" v-else>
    <div
      class="images_item"
      v-for="(key, index) in Object.keys(showImages)"
      :key="index"
    >
      <div class="images__header">
        <p>{{ key.split("-")[0] }}</p>
        <span>{{ key.split("-")[1] + "-" + key.split("-")[2] }}</span>
      </div>
      <div class="image">
        <figure v-for="item in showImages[key]" :key="item">
          <img :src="item" alt="" />
          <button @click="deleteImageByName(item)">
            <font-awesome-icon icon="fa-solid fa-minus" />
          </button>
          <figcaption @click="copy(item)">Click Copy Url</figcaption>
        </figure>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.images {
  &__container {
    max-width: 80%;
    padding: 2rem;
    margin: 2rem auto;

    &-load {
      padding: 2rem;
      margin: 2rem auto;
      text-align: center;
      font-size: 2rem;
      font-weight: 500;
    }
  }

  &__header {
    height: 10rem;
  }

  &_item {
    padding: 1rem;
    position: relative;

    p {
      position: absolute;
      z-index: 1;
      font-size: 7rem;
      color: rgba(128, 128, 128, 0.5);
      font-weight: 700;
      letter-spacing: 5px;
    }

    span {
      position: absolute;
      top: 4rem;
      left: 12rem;
      font-size: 5rem;
      font-weight: 500;
    }
  }
}

.image {
  display: flex;
  gap: 2rem 3rem;
  flex-wrap: wrap;

  figure {
    position: relative;
    width: 30rem;
    height: 30rem;

    &:hover {
      button {
        opacity: 1;
        visibility: visible;
      }

      figcaption {
        opacity: 1;
        visibility: visible;
      }
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
      visibility: hidden;
      transition: all 0.2s;
      color: white;

      &:hover {
        background: rgb(161, 5, 5);
      }
    }

    figcaption {
      position: absolute;
      top: 0;
      left: 0;
      width: 30rem;
      height: 30rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 3rem;
      backdrop-filter: blur(5px);
      opacity: 0;
      visibility: hidden;
      transition: all 0.5s;
      cursor: pointer;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
