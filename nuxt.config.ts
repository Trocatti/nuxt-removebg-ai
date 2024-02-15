import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: true },

  build: {
    transpile: ['vuetify'],
  },

  modules: [
    '@vueuse/nuxt',

    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],

  runtimeConfig: { 
    public: {
      REMOVE_BG_TOKEN: process.env.REMOVE_BG_TOKEN,
    } 
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})

