import { useLoaderData } from '@remix-run/react';
import { List } from '../components/List';
import { listPrayerRequests } from '../services/prayer.server';
import type { LoaderFunction } from '@remix-run/node';
import { requireUser } from '~/services/session.server';
import { getChurch } from '~/services/church.server';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request);

  const church = await getChurch({ churchId: user.churchId });
  const prayers = await listPrayerRequests({ cellId: user.cellId });

  return { prayers: prayers.slice(0, 10), church };
};

const Prayers = () => {
  const { prayers, church } = useLoaderData();
  return (
    <List
      title={church.name}
      description="Lista com os últimos pedidos de oração"
      collection={prayers}
    />
  );
};

export default Prayers;
