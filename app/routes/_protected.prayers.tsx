import { useLoaderData } from '@remix-run/react';
import { List } from '../components/List';
import { listPrayerRequests } from '../services/prayer.server';
import type {
  ActionArgs,
  LoaderFunction,
  V2_MetaFunction,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import { requireUser } from '~/services/session.server';
import { getChurch } from '~/services/church.server';
import { MainFooter } from '~/components/MainFooter';
import { TopHeader } from '~/components/TopHeader';
import {
  prayForRequestWithId,
  removePrayForRequestWithId,
} from '~/services/request-pray.server';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request);
  const church = await getChurch({ churchId: user.churchId });
  const prayers = await listPrayerRequests({ cellId: user.cellId });

  return { prayers: prayers?.slice(0, 10), church };
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const userId = formData.get('userId') as string;
  const requestId = formData.get('requestId') as string;
  const action = formData.get('prayAction') as 'on' | 'off';

  if (!userId || !requestId || !action) {
    return json(
      { errors: { userId: 'Invalid user or request' } },
      { status: 400 }
    );
  }

  const actionMap = {
    on: prayForRequestWithId,
    off: removePrayForRequestWithId,
  };

  return await actionMap[action](requestId, userId);
};

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Prayers | Orem Club' }];
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
