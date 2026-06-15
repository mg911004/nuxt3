// eslint.config.mjs
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([
  {
    ignores: [
      '.nuxt/**',
      '.output/**',
      'dist/**',
      'node_modules/**',
      'pnpm-lock.yaml'
    ]
  },
  {
    rules: {
      'vue/html-self-closing': 'off',
    },
  },
])
