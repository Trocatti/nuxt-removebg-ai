<template>
  <div>
    <p v-if="!isOverDropZone && !urlPreview">
      Arraste sua imagem para a caixa ou clique no input
    </p>

    <v-img
      v-if="urlPreview"
      :src="urlPreview"
      width="300"
      height="200"
      aspect-ratio="16/9"
      cover
    ></v-img>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useDropZone } from "@vueuse/core";
import { createUrl } from "../utils";

const props = defineProps<{
  file: File,
  dropZoneRef: HTMLDivElement
}>()

const emits = defineEmits(["dropImage"]);

const urlPreview = ref<string>();

onMounted(() => {
  if (props.file) {
    urlPreview.value = createUrl(props.file);
  }
});

function onDrop(files: File[] | null) {
  if (!files) return;

  const [file] = files;

  urlPreview.value = createUrl(file);

  emits("dropImage", file);
}

const { isOverDropZone } = useDropZone(props.dropZoneRef, {
  onDrop,
  dataTypes: ["image/jpeg", "image/png"],
});
</script>
