<template>
  <v-container
    fluid
    class="d-flex flex-column align-center justify-center h-100"
  >
    <h1 class="text-h5">Remova o background de suas fotos</h1>
    <p class="mb-8">100% automatico e free!</p>

    <v-col cols="6">
      <FormConfig></FormConfig>
      <CardImage></CardImage>
    </v-col>
  </v-container>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const CardImage = defineAsyncComponent(() =>
  import('./components/CardImage.vue')
)

const FormConfig = defineAsyncComponent(() =>
  import('./components/FormConfig.vue')
)

</script>

