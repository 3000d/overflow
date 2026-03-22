// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://overflow.gallery',
    i18n: {
        locales: ['en', 'fr'],
        defaultLocale: 'fr',
        fallback: {en: 'fr'},
        routing: {
            prefixDefaultLocale: true,
            fallbackType: 'rewrite'
        }
    },
    vite: {
        optimizeDeps: {
            esbuildOptions: {
                define: {
                    global: 'globalThis'
                }
            }
        }
    }
});
