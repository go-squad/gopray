import type { ActionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { useEffect, useRef } from 'react';
import { createPrayerRequest } from '~/services/prayer.server';
import { requireUser } from '~/services/session.server';

export const action = async ({ request }: ActionArgs) => {
  const user = await requireUser(request);

  const formData = await request.formData();
  const body = formData.get('body');

  if (typeof body !== 'string' || body.length === 0) {
    return json({ errors: { body: 'Body is required' } }, { status: 400 });
  }

  await createPrayerRequest({ body, userId: user.id, cellId: user.cellId });

  return redirect('/');
};

const New = () => {
  const actionData = useActionData<typeof action>();
  const bodyReference = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (actionData?.errors?.body) {
      bodyReference.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="container max-w-full mx-auto md:py-24 px-6">
      <div className="max-w-sm mx-auto px-6">
        <div className="relative flex flex-wrap">
          <div className="w-full relative">
            <div className="md:mt-6">
              <div className="text-center font-semibold text-gray-300">
                Novo motivo
              </div>
              <Form method="post" className="mt-8">
                <div className="mx-auto max-w-lg ">
                  <div className="py-1">
                    <label>
                      <span className="px-1 text-sm text-gray-300">
                        Qual seria o seu pedido de oração?
                      </span>
                      <textarea
                        autoFocus={true}
                        name="body"
                        maxLength={200}
                        placeholder="what would you like to share today?"
                        ref={bodyReference}
                        rows={8}
                        className="bg-gray-800 height-100 min-h-full text-md text-white block px-3 py-2 rounded-lg w-full border-2 border-gray-300 placeholder-gray-400 shadow-md focus:placeholder-gray-500 focus:bg-transparent focus:border-gray-600 focus:outline-none"
                        aria-invalid={
                          actionData?.errors?.body ? true : undefined
                        }
                        aria-errormessage={
                          actionData?.errors?.body ? 'body-error' : undefined
                        }
                      />
                      {actionData?.errors?.body ? (
                        <div className="pt-1 text-red-700" id="body-error">
                          {actionData.errors.body}
                        </div>
                      ) : // eslint-disable-next-line unicorn/no-null
                      null}
                    </label>
                  </div>

                  <button className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black">
                    Compartilhar
                  </button>
                </div>
              </Form>
              <Form action="/logout" method="post">
                <button
                  className="mt-3 text-lg font-semibold bg-gray-300 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
                  type="submit"
                >
                  Logout
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
