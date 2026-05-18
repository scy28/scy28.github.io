// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  vite: {
    cacheDir: process.env.ASTRO_VITE_CACHE_DIR ?? ".astro-vite-cache",
  },
});
