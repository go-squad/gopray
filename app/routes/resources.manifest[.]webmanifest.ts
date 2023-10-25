import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async () => {
  return json(
    {
      id: 'go-pray-app',
      short_name: 'Orem Club',
      name: 'Orem Club',
      start_url: '/',
      display: 'standalone',
      display_override: ['window-controls-overlay', 'standalone', 'browser'],
      description: 'Aplicação de gerenciamento de orações',
      background_color: '#0f182a',
      theme_color: '#0f182a',
      orientation: 'portrait-primary',
      categories: ['lifestyle', 'social', 'spiritual'],
      dir: 'ltr',
      lang: 'pt',
      scope: 'https://app.orem.club',
      shortcuts: [
        {
          name: 'prayers',
          url: '/',
          icons: [
            {
              src: '/icons/96x96.png',
              sizes: '96x96',
              type: 'image/png',
              purpose: 'any monochrome',
            },
          ],
        },
      ],
      icons: [
        {
          src: '/icons/16x16.png',
          sizes: '16x16',
          type: 'image/png',
          density: '1.0',
        },
        {
          src: '/icons/32x32.png',
          sizes: '32x32',
          type: 'image/png',
          density: '1.0',
        },
        {
          src: '/icons/48x48.png',
          sizes: '48x48',
          type: 'image/png',
          density: '1.0',
          purpose: 'any',
        },
        {
          src: '/icons/58x58.png',
          sizes: '58x58',
          type: 'image/png',
          density: '1.0',
        },
        {
          src: '/icons/72x72.png',
          sizes: '72x72',
          type: 'image/png',
          density: '1.5',
        },
        {
          src: '/icons/96x96.png',
          sizes: '96x96',
          type: 'image/png',
          density: '2.0',
        },
        {
          src: '/icons/144x144.png',
          sizes: '144x144',
          type: 'image/png',
          density: '3.0',
        },
        {
          src: '/icons/192x192.png',
          sizes: '192x192',
          type: 'image/png',
          density: '4.0',
        },
        {
          src: '/icons/256x256.png',
          sizes: '256x256',
          type: 'image/png',
          density: '1.0',
        },
        {
          src: '/icons/512x512.png',
          sizes: '512x512',
          type: 'image/png',
          density: '5.0',
        },
      ],
      screenshots: [
        {
          src: '/screenshots/feed.png',
          sizes: '472x963',
          type: 'image/jpg',
          platform: 'wide',
        },
        {
          src: '/screenshots/profile.png',
          sizes: '472x963',
          type: 'image/jpg',
          platform: 'wide',
        },
        {
          src: '/screenshots/new-prayer.png',
          sizes: '472x963',
          type: 'image/jpg',
          platform: 'wide',
        },
      ],
      launch_handler: {
        client_mode: ['navigate-existing', 'auto'],
      },
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=600',
        'Content-Type': 'application/manifest+json',
      },
    }
  );
};
