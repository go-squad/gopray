import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async () => {
  return json(
    {
      short_name: 'Orem Club',
      name: 'Orem Club',
      start_url: '/',
      display: 'standalone',
      background_color: '#0f182a',
      theme_color: '#0f182a',
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
          purpose: 'maskable',
        },
        {
          src: '/icons/32x32.png',
          sizes: '32x32',
          type: 'image/png',
          density: '1.0',
          purpose: 'maskable',
        },
        {
          src: '/icons/48x48.png',
          sizes: '48x48',
          type: 'image/png',
          density: '1.0',
          purpose: 'maskable',
        },
        {
          src: '/icons/58x58.png',
          sizes: '58x58',
          type: 'image/png',
          density: '1.0',
          purpose: 'maskable',
        },
        {
          src: '/icons/72x72.png',
          sizes: '72x72',
          type: 'image/png',
          density: '1.5',
          purpose: 'maskable',
        },
        {
          src: '/icons/96x96.png',
          sizes: '96x96',
          type: 'image/png',
          density: '2.0',
          purpose: 'maskable',
        },
        {
          src: '/icons/144x144.png',
          sizes: '144x144',
          type: 'image/png',
          density: '3.0',
          purpose: 'maskable',
        },
        {
          src: '/icons/192x192.png',
          sizes: '192x192',
          type: 'image/png',
          density: '4.0',
          purpose: 'maskable',
        },
        {
          src: '/icons/256x256.png',
          sizes: '256x256',
          type: 'image/png',
          density: '1.0',
          purpose: 'maskable',
        },
        {
          src: '/icons/512x512.png',
          sizes: '512x512',
          type: 'image/png',
          density: '5.0',
          purpose: 'maskable',
        },
      ],
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=600',
        'Content-Type': 'application/manifest+json',
      },
    }
  );
};
