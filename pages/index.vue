<template>
  <v-container
    fluid
    class="d-flex flex-column align-center justify-center h-screen"
  >
    <h1 class="text-h5">Remova o background da sua foto abaixo</h1>
    <p class="mb-8">100% automatico e free!</p>

    <v-col cols="4">
      <v-card ref="dropZoneRef">
        <p v-if="!isOverDropZone">
          Arraste sua imagem para a caixa ou clique no input
        </p>

        <v-img
          width="357"
          height="200"
          aspect-ratio="16/9"
          cover
          :src="preview?.url"
        ></v-img>

        <v-img
          width="357"
          height="200"
          aspect-ratio="16/9"
          cover
          :src="imgConverted"
        ></v-img>

        <v-card-actions>
          <v-file-input
            accept="image/png, image/jpeg"
            placeholder="Pick an avatar"
            prepend-icon="mdi-camera"
            label="Avatar"
            @input="handleInput"
          ></v-file-input>

          <v-btn @click.prevent="submitImage"> Remover background </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-container>
</template>

<script setup lang="ts">
const dropZoneRef = ref<HTMLDivElement>();
const preview = ref<{ url: string; file: any }>();
const imgConverted = ref<string>();

async function submitImage() {
  if (!preview.value?.file) return;

  const formData = new FormData();
  formData.append("file", preview.value.file);

  const respose: Blob = await $fetch("api/upload", {
    method: "POST",
    body: formData,
  });

  imgConverted.value = URL.createObjectURL(respose)
}

function handleInput (e: Event) {
  const inputElement = e.target as HTMLInputElement;

  if (inputElement?.files) {
    const files: FileList = inputElement.files;
    createPreview(Array.from(files));
  }
}

function createPreview(files: File[]) {

  const [file] = files;

  preview.value = {
    url: URL.createObjectURL(file),
    file,
  };
}

function onDrop(files: File[] | null) {
  if (!files) return;

  createPreview(files)
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  dataTypes: ["image/jpeg", "image/png"],
});
</script>
