import { useSWEffect } from '~/utils/client/sw-hook';
import { Link, V2_MetaFunction } from '@remix-run/react';
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

import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en.json';
import pt from 'javascript-time-ago/locale/pt.json';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(pt);

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];
export const meta: V2_MetaFunction = () => {
  return [{ title: 'Orem Club' }];
};

export const ErrorBoundary = ({ error }: { error: Error }) => {
  console.error(error);
  return (
    <html className="flex justify-center items-center h-full">
      <head>
        <title className="text-gray-300">Oh no!</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover, width=device-width, user-scalable=no"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <Meta />
        <link rel="manifest" href="/resources/manifest.webmanifest" />
        <Meta />
        <Links />
      </head>
      <body className="flex justify-center items-center bg-slate-900 h-full">
        <div className="flex flex-col items-center">
          <h1 className="text-xl text-gray-200">Opps!</h1>
          <p className="text-xs text-gray-400 mb-2">
            Tente novamente mais tarde :(
          </p>
          <Link className="text-xs text-blue-400" to="/">
            <span>voltar ao início {'>'}</span>
          </Link>
        </div>
        <p>{error?.message}</p>
        <Scripts />
      </body>
    </html>
  );
};

export default function App() {
  useSWEffect();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover, width=device-width, user-scalable=no"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <Meta />
        <link rel="manifest" href="/resources/manifest.webmanifest" />

        <link
          href="/splashscreens/iphone5_splash.png"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splashscreens/iphone6_splash.png"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splashscreens/iphoneplus_splash.png"
          media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splashscreens/iphonex_splash.png"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splashscreens/iphonexr_splash.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splashscreens/iphonexsmax_splash.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splashscreens/ipad_splash.png"
          media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splashscreens/ipadpro1_splash.png"
          media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splashscreens/ipadpro3_splash.png"
          media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splashscreens/ipadpro2_splash.png"
          media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <Links />

        <style>
          {`
            html {
              height: calc(100% + env(safe-area-inset-top));
              height: -webkit-fill-available;
              width: 100%;
              padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
              touch-action: pan-x pan-y;
            }
            body {
              min-height: 100vh;
              width: 100%;
              min-height: -webkit-fill-available;
              border: 1px solid transparent;
            }
            @media (display-mode: standalone) {
              .h-sa {
                height: 100px;
              }
              .mt-sa {
                margin-top: 70px;
              }
            }

          `}
        </style>
      </head>
      <body className="bg-slate-900 h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
