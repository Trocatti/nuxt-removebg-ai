<template>
  <v-container
    fluid
    class="d-flex flex-column align-center justify-center h-100"
  >
    <h1 class="text-h5">Remova o background de suas fotos</h1>
    <p class="mb-8">100% automatico e free!</p>

    <v-col cols="6">
      <v-card class="mb-6">
        <v-card-title>Configurações</v-card-title>
        <v-card-item>
          {{ configs }}
        </v-card-item>
      </v-card>

      <v-card ref="dropZoneRef">
        <v-card-item>
          <div class="d-flex flex-row align-center justify-center">
            <div class="dropZone_container dropZone">
              <p v-if="!isOverDropZone && !preview?.url">
                Arraste sua imagem para a caixa ou clique no input
              </p>

              <v-img
                v-if="preview?.url"
                :src="preview.url"
                width="300"
                height="200"
                aspect-ratio="16/9"
                cover
              ></v-img>
            </div>

            <div class="dropZone_container">
              <v-img
                v-if="imgConverted"
                :src="imgConverted"
                width="300"
                height="200"
                aspect-ratio="16/9"
                cover
              >
              <a :href="imgConverted" download="AwesomeImage.png">
                download
              </a>
            </v-img>

              <p v-if="loading">Removendo!</p>

              <v-btn
                v-if="!imgConverted"
                :disabled="!preview?.url"
                @click.prevent="submitImage"
              >
                Remover background
              </v-btn>
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
    </v-col>
  </v-container>
</template>

<script setup lang="ts">
const dropZoneRef = ref<HTMLDivElement>();
const preview = ref<{ url: string; file: any }>();
const imgConverted = ref<string>();
const loading = ref<boolean>();
const configs = reactive<Config>({ channels: "rgba" });

type Config = {
  size?: string;
  type?: string;
  typeLevel?: string;
  format?: string;
  roi?: string;
  crop?: boolean;
  cropMargin?: string;
  scale?: string;
  position?: string;
  channels: string;
  addShadow?: boolean;
  semitransparency?: boolean;
  bgColor?: string;
  bgImageUrl?: string;
};

async function submitImage() {
  if (!preview.value?.file) return;

  const formData = new FormData();
  formData.append("file", preview.value.file);

  loading.value = true;

  try {
    const respose: Blob = await $fetch("api/upload", {
      method: "POST",
      body: formData,
    });

    imgConverted.value = URL.createObjectURL(respose);
  } catch (e) {
    console.error(e);
  }

  loading.value = false;
}

function handleInput(e: Event) {
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

  createPreview(files);
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  dataTypes: ["image/jpeg", "image/png"],
});
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
