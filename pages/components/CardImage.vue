<template>
  <v-card ref="dropZoneRef">
    <v-card-item>
      <div class="d-flex flex-row align-center justify-center">
        <div class="dropZone_container dropZone">
          <DropImage
            :dropZoneRef="dropZoneRef"
            :file="file"
            @dropImage="(dropFile: File) => file = dropFile"
          ></DropImage>
        </div>

        <div class="dropZone_container">
          <ResultImage :file="file"></ResultImage>
        </div>
      </div>
    </v-card-item>

    <v-card-actions class="d-flex flex-column">
      <div class="w-100">
        <v-file-input
          accept="image/png, image/jpeg"
          placeholder="Arraste sua imagem ou clique no input"
          prepend-icon=""
          append-inner-icon="mdi-camera"
          label="Arraste sua imagem ou clique no input"
          @input="handleInput"
        ></v-file-input>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from "vue";

const file = ref<File>();
const dropZoneRef = ref<HTMLDivElement>();

const DropImage = defineAsyncComponent(() => import("./DropImage.vue"));

const ResultImage = defineAsyncComponent(() => import("./ResultImage.vue"));

function handleInput(e: Event) {
  const inputElement = e.target as HTMLInputElement;

  if (inputElement?.files) {
    const files: FileList = inputElement.files;

    file.value = files[0];
  }
}
</script>

<style type="text/css" setup>
.dropZone_container {
  width: 300px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.dropZone {
  border: 1px dashed gray;
}
</style>
