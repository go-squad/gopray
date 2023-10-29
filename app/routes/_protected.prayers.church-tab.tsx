import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { List } from '~/components/prayers/List';
import { getChurch } from '~/services/church.server';
import { listPrayerByChurchId } from '~/services/prayer.server';
import { requireUser } from '~/services/session.server';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request);
  const church = await getChurch({ churchId: user.churchId });
  const prayers = await listPrayerByChurchId({
    churchId: user.churchId,
    loggedUserId: user.id,
  });

  return { prayers: prayers?.slice(0, 10), church, user };
};

const ChurchTab = () => {
  const { prayers, church, user } = useLoaderData();
  return (
    <List
      title={church.name}
      description="Lista com os últimos pedidos de oração"
      collection={prayers}
      user={user}
    />
  );
};

export default ChurchTab;
