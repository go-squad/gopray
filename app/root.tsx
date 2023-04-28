import { useSWEffect } from '~/utils/client/sw-hook';
import type { V2_MetaFunction } from '@remix-run/react';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node'; // or cloudflare/deno
import styles from './tailwind.css';
export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];
export const meta: V2_MetaFunction = () => {
  return [{ title: 'Orem+' }];
};
export default function App() {
  useSWEffect();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <link rel="manifest" href="/resources/manifest.webmanifest" />
        <Links />
      </head>
      <body className="bg-white dark:bg-gray-800">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
