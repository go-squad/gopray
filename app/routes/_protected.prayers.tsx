import { useLoaderData } from '@remix-run/react';
import { List } from '../components/List';
import { listPrayerRequests } from '../services/prayer.server';
import type { LoaderFunction } from '@remix-run/node';
import { authenticator } from '~/services/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  const prayers = await listPrayerRequests();

  await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  return { prayers: prayers.slice(0, 10) };
};

const Prayers = () => {
  const { prayers } = useLoaderData();
  return (
    <List
      title="Igreja Oceânica"
      description="Lista com os últimos pedidos de oração"
      collection={prayers}
    />
  );
};

export default Prayers;
