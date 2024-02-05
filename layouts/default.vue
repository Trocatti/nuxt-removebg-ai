<template>
  <v-app>
    <AppHeader />

    <v-main>
      <slot></slot>
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script setup lang="ts"></script>
