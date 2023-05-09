import { useLoaderData } from '@remix-run/react';
import { List } from '../components/List';
import { listPrayerRequests } from '../services/prayer.server';
import type { LoaderFunction } from '@remix-run/node';
import { requireUser } from '~/services/session.server';
import { getChurch } from '~/services/church.server';
import { MainFooter } from '~/components/MainFooter';
import { TopHeader } from '~/components/TopHeader';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request);

  const church = await getChurch({ churchId: user.churchId });
  const prayers = await listPrayerRequests({ cellId: user.cellId });

  return { prayers: prayers.slice(0, 10), church };
};

const Prayers = () => {
  const { prayers, church } = useLoaderData();
  return (
    <>
      <TopHeader title={church.name} />
      <List
        title={church.name}
        description="Lista com os últimos pedidos de oração"
        collection={prayers}
      />
      <MainFooter />
    </>
  );
};

export default Prayers;
