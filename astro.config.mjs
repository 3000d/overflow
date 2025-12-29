// @ts-check
import {defineConfig} from 'astro/config';

// https://astro.build/config
export default defineConfig({
    i18n: {
        locales: ['en', 'fr'],
        defaultLocale: 'fr',
        fallback: {en: 'fr'},
        routing: {
            prefixDefaultLocale: true,
            fallbackType: 'rewrite'
        }
    },
});
