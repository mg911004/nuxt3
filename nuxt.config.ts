// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  experimental: {
    viteEnvironmentApi: true,
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/base-tokens.css', '~/assets/css/swal.css', 'gridstack/dist/gridstack.min.css'],
  components: true,
  modules: ['@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', '@nuxt/eslint'],
  imports: {
    dirs: ['composables', 'api', 'constants'],
  },
  runtimeConfig: {
    public: {
      API_HOST: '',
    },
  },
  eslint: {
    config: {
      stylistic: false,
    },
  },
  app: {
    head: {
      title: 'title',
      htmlAttrs: { lang: 'ko' },
      meta: [{ name: 'description', content: 'content' }],
    },
  },
  // 정적 배포 설정
  // nitro: {
  //   preset: 'static',
  //   prerender: {
  //     routes: [],
  //     crawlLinks: false,
  //   },
  // },
});

