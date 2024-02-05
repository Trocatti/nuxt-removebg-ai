<template>
  <v-img
    v-if="urlConverted"
    :src="urlConverted"
    width="300"
    height="200"
    aspect-ratio="16/9"
    cover
  >
    <a :href="urlConverted" download="ImageWithoutBg.png"> download </a>
  </v-img>

  <p v-if="loading">Removendo!</p>

  <v-btn
    v-if="!urlConverted"
    :disabled="!file"
    @click.prevent="submitImage"
  >
    Remover background
  </v-btn>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { createUrl } from "../utils";
import ImageService from "../services/image.service";

const urlConverted = ref<string>();
const loading = ref<boolean>();

const props = defineProps({
  file: File,
});

async function submitImage() {
  if(!props?.file) return

  loading.value = true;

  const file:Blob = await ImageService.post(props.file);

  urlConverted.value = createUrl(file)

  loading.value = !loading.value;
}
</script>
