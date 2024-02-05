<template>
  <v-card class="mb-6">
    <v-card-title>Configurações</v-card-title>
    <v-card-item>
      {{ configs }}
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
import { reactive } from "vue";

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
</script>
