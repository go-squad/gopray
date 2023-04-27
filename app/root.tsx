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
    { title: 'Ore+' },
    {
      charSet: 'utf8',
    },
  ];
}; //TODO: Does not seem to be working

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
