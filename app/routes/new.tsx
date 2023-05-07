import type { ActionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { createPrayerRequest } from '~/services/prayer.server';
import { requireUserId } from '~/services/session.server';

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const title = formData.get('title');
  const body = formData.get('body');

  if (typeof title !== 'string' || title.length === 0) {
    // eslint-disable-next-line unicorn/no-null
    return json({ errors: { body: null } }, { status: 400 });
  }

  if (typeof body !== 'string' || body.length === 0) {
    return json({ errors: { body: 'Body is required' } }, { status: 400 });
  }

  const note = await createPrayerRequest({ body, userId });

  return redirect(`/notes/${note.id}`);
};

const New = () => {
  return (
    <div className="container max-w-full mx-auto md:py-24 px-6">
      <div className="max-w-sm mx-auto px-6">
        <div className="relative flex flex-wrap">
          <div className="w-full relative">
            <div className="md:mt-6">
              <div className="text-center font-semibold text-black">
                Lorem ipsum dolor
              </div>
              <div className="text-center font-base text-black">
                Sed ut perspiciatis unde?
              </div>
              <Form method="post" className="mt-8">
                <div className="mx-auto max-w-lg ">
                  <div className="py-1">
                    <span className="px-1 text-sm text-gray-600">
                      Add your prayer motive
                    </span>
                    <textarea
                      autoFocus={true}
                      name="body"
                      maxLength={200}
                      placeholder="what would you like to share today?"
                      className="bg-gray-800 height-100 min-h-full text-md text-white block px-3 py-2 rounded-lg w-full border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-transparent focus:border-gray-600 focus:outline-none"
                    />
                  </div>

                  <button className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black">
                    Share
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
