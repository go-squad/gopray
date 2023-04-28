import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  V2_MetaFunction,
} from '@remix-run/react';
import { LinksFunction, LoaderFunction, json, redirect } from '@remix-run/node'; // or cloudflare/deno
import styles from './tailwind.css';
import { AUTHENTICATED } from './models/app.constants';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];
export const meta: V2_MetaFunction = () => {
  return [
    { title: 'Orem+' },
    {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1',
    },
    {
      charset: 'utf8',
    },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  if (!AUTHENTICATED && url.pathname !== '/login') {
    return redirect('/login');
  }
  return json('ok');
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
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
