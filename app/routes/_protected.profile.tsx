import type { LoaderFunction } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { TopHeader } from '~/components/TopHeader';
import { requireUser } from '~/services/session.server';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request);
  return { user };
};

const Profile = () => {
  const { user } = useLoaderData();
  return (
    <>
      <TopHeader title={'Perfil'} isHome={false} />
      <div className="container">
        <p className="text-gray-600 text-center">
          <span>user: {user.email} </span>
        </p>
        <Form action="/logout" method="post">
          <button
            className="mt-3 text-lg font-semibold bg-gray-300 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
            type="submit"
          >
            Logout
          </button>
        </Form>
      </div>
    </>
  );
};

export default Profile;
