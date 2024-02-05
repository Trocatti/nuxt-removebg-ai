<template>
  <v-app>
    <AppHeader />

    <v-main>
      <v-container fluid>
        <v-row>
          <v-col class="main-content">
            <slot></slot>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script setup lang="ts"></script>
