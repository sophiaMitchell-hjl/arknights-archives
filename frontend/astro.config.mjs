import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// site:canonical、Open Graph、sitemap 都依赖它。上线时改成真实域名。
export default defineConfig({
  site: 'https://arknights-relations.example.com',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({ changefreq: 'weekly', priority: 0.7 }),
  ],
});
