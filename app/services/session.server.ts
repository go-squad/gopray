import { createCookieSessionStorage } from '@remix-run/node';
import { SESSION_SECRET } from '~/models/app.constants';

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '_session',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [SESSION_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
});

export { sessionStorage };
