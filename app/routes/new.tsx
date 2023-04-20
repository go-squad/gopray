import { useLoaderData } from '@remix-run/react';
import { getUser } from '~/services/user.server';

export const loader = async () => {
  const user = await getUser();

  return { user };
};

const New = () => {
  const { user } = useLoaderData();
  return <div>works! {user.name}</div>;
};

export default New;
