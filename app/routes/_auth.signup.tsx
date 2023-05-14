/* eslint-disable unicorn/no-null */
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

import { createUserSession, getUserId } from '~/services/session.server';
import { createUser, getUserByEmail } from '~/services/user.server';
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
  const cellId = formData.get('cellId');

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

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: 'Password is too short' } },
      { status: 400 }
    );
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json(
      {
        errors: {
          email: 'A user already exists with this email',
          password: null,
        },
      },
      { status: 400 }
    );
  }

  if (!cellId || typeof cellId !== 'string') {
    return json(
      {
        errors: {
          email: null,
          password: null,
          cellId: 'Você precisa de um convite para fazer o cadastro.',
        },
      },
      { status: 400 }
    );
  }

  const user = await createUser(email, password, cellId);

  return createUserSession({
    redirectTo,
    remember: false,
    request,
    userId: user.id,
  });
};

export const Signup = () => {
  const [searchParameters] = useSearchParams();
  const redirectTo = searchParameters.get('redirectTo') ?? undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== 'idle';
  const actionData = useActionData<typeof action>();

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5 text-gray-300">
          Orem Club
        </h1>
        <div className="bg-slate-900 shadow w-full rounded-lg">
          <div className="px-5 py-7">
            <Form method="post" className="form">
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
                  required
                  autoFocus={true}
                  autoComplete="email"
                  aria-invalid={actionData?.errors?.email ? true : undefined}
                  aria-describedby="email-error"
                  className="bg-gray-800 text-gray-100 border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                />
                {actionData?.errors?.email ? (
                  <div className="pt-1 text-red-700" id="email-error">
                    {actionData.errors.email}
                  </div>
                ) : // eslint-disable-next-line unicorn/no-null
                null}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="font-semibold text-sm text-gray-300 pb-1 block"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  aria-invalid={actionData?.errors?.password ? true : undefined}
                  aria-describedby="password-error"
                  className="bg-gray-800 border text-gray-100 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                />
                {actionData?.errors?.password ? (
                  <div className="pt-1 text-red-700" id="password-error">
                    {actionData.errors.password}
                  </div>
                ) : // eslint-disable-next-line unicorn/no-null
                null}
              </div>
              <label
                htmlFor="confirmation"
                className="font-semibold text-sm text-gray-300 pb-1 block"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmation"
                id="confirmation"
                className="bg-gray-800 border text-gray-100 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <input
                type="hidden"
                name="cellId"
                value={searchParameters.get('invitation') || ''}
              />
              <input type="hidden" name="redirectTo" value={redirectTo} />
              {actionData?.errors?.cellId ? (
                <div className="pt-1 text-red-700 mb-3" id="email-error">
                  {actionData.errors.cellId}
                </div>
              ) : // eslint-disable-next-line unicorn/no-null
              null}
              <button
                disabled={isSubmitting}
                type="submit"
                className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">
                  {isSubmitting ? 'Authenticating...' : 'Create Account'}
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
          </div>
          <div className="px-5 text-sm flex justify-center">
            <span className="text-gray-300 mr-2">
              Have an account already?{' '}
            </span>
            <Link className="text-blue-300" to="/login">
              Login
            </Link>
          </div>
          <div className="py-5">
            <div className="grid grid-cols-2 gap-1">
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
              <div className="text-center sm:text-right whitespace-nowrap">
                <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block align-text-bottom	"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <span className="inline-block ml-1">Help</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
