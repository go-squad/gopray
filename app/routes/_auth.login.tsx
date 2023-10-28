/* eslint-disable unicorn/no-null */
import { BookOpenIcon } from '@heroicons/react/24/solid';
import type {
  ActionArgs,
  ActionFunction,
  LoaderArgs,
  LoaderFunction,
} from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from '@remix-run/react';
import { useEffect, useRef } from 'react';
import OremLogo from '~/components/icons/OremLogo';
import { createUserSession, getUserId } from '~/services/session.server';
import { verifyLogin } from '~/services/user.server';
import { safeRedirect } from '~/utils/server/safe-redirect';
import { validateEmail } from '~/utils/server/validate-email';

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect('/');
  return json({});
};

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');
  const redirectTo = safeRedirect(formData.get('redirectTo'), '/');
  const remember = formData.get('remember');

  if (!validateEmail(email)) {
    return json(
      { errors: { email: 'Email is invalid', password: null } },
      { status: 400 }
    );
  }

  if (typeof password !== 'string' || password.length === 0) {
    return json(
      { errors: { email: null, password: 'Password is required' } },
      { status: 400 }
    );
  }

  if (password.length < 4) {
    return json(
      { errors: { email: null, password: 'Password is too short' } },
      { status: 400 }
    );
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    return json(
      { errors: { email: 'Invalid email or password', password: null } },
      { status: 400 }
    );
  }

  return createUserSession({
    redirectTo,
    remember: remember === 'on' ? true : false,
    request,
    userId: user.id,
  });
};

export const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== 'idle';
  const [searchParameters] = useSearchParams();
  const redirectTo = searchParameters.get('redirectTo') || '/prayers';
  const actionData = useActionData<typeof action>();
  const emailReference = useRef<HTMLInputElement>(null);
  const passwordReference = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailReference.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordReference.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="min-h-full h-full w-full bg-gray-800 flex justify-center items-center sm:py-12">
      <div className="flex flex-col items-center p-10 xs:p-0  w-full min-w-[300px] max-w-[500px]">
        <h1 className="font-bold text-center text-2xl mb-5 text-gray-300">
          <OremLogo />
        </h1>
        <div className="p-6 w-full bg-slate-900 shadow rounded-lg ">
          <Form method="post" className="form  mb-3">
            <div>
              <label
                htmlFor="email"
                className="font-semibold text-sm text-gray-300 pb-1 block"
              >
                E-mail
              </label>
              <input
                type="email"
                name="email"
                id="email"
                ref={emailReference}
                required
                autoFocus={true}
                autoComplete="email"
                aria-invalid={actionData?.errors?.email ? true : undefined}
                aria-describedby="email-error"
                className="bg-transparent text-gray-100 border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              {actionData?.errors?.email ? (
                <div className="pt-1 text-red-700" id="email-error">
                  {actionData.errors.email}
                </div>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="password"
                className="font-semibold text-sm text-gray-300 pb-1 block"
              >
                Password
              </label>
              <input
                id="password"
                ref={passwordReference}
                name="password"
                type="password"
                autoComplete="current-password"
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
                className="bg-gray-800 border text-gray-100 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              {actionData?.errors?.password ? (
                <div className="pt-1 text-red-700" id="password-error">
                  {actionData.errors.password}
                </div>
              ) : null}
            </div>

            <input type="hidden" name="redirectTo" value={redirectTo} />
            <button
              disabled={isSubmitting}
              type="submit"
              className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
            >
              <span className="inline-block mr-2">
                {isSubmitting ? 'Authenticating...' : 'Login'}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </Form>

          <div className="flex flex-col items-center">
            <div className="flex items-center mb-3">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-300"
              >
                Remember me
              </label>
            </div>
            <div className="text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link
                className="text-blue-500 underline"
                to={{
                  pathname: '/signup',
                  search: searchParameters.toString(),
                }}
              >
                Sign up
              </Link>
            </div>
          </div>
          {/* <div className="py-5">
            <div className="grid grid-cols-2">
              <div className="text-center sm:text-left whitespace-nowrap">
                <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-300 hover:bg-gray-600 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block align-text-top"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="inline-block ml-1">Forgot Password</span>
                </button>
              </div>
            </div>
          </div> */}
        </div>
        <div className="flex flex-col items-center">
          <BookOpenIcon className="text-gray-400 w-8 mt-6" />
          <p className="p-px text-sm text-center italic text-gray-400 mt-3 mb-2">
            Não deixemos de reunir-nos como igreja, segundo o costume de alguns,
            mas procuremos encorajar-nos uns aos outros, ainda mais quando vocês
            veem que se aproxima o Dia.
          </p>
          <span className="text-sm font-bold text-gray-300">
            Hebreus 10:24-25
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
