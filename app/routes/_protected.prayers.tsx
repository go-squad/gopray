import { LoaderFunction, type V2_MetaFunction } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { useState } from 'react';

import { MainFooter } from '~/components/layout/MainFooter';
import { TopHeader } from '~/components/layout/TopHeader';
import { List } from '~/components/prayers/List';
import { getChurch } from '~/services/church.server';
import {
  listPrayerByChurchId,
  listPrayerRequests,
} from '~/services/prayer.server';
import { requireUser } from '~/services/session.server';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(await request.url);
  const audience = url.searchParams.get('audience') || 'CELL';
  const user = await requireUser(request);
  const churchId = user?.churchId;
  const church = await getChurch({ churchId });
  const cellId = user?.cellId;

  let prayers;

  if (audience === 'CELL') {
    console.log('CELL');
    prayers = await listPrayerRequests({
      cellId,
      loggedUserId: user.id,
    });
  } else if (audience === 'CHURCH') {
    console.log('CHURCH');
    prayers = await listPrayerByChurchId({
      churchId,
      loggedUserId: user.id,
    });
  }
  return { prayers: prayers?.slice(0, 10), church, user, audience };
};

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Prayers | Orem Club' }];
};

const Prayers = () => {
  const { prayers, church, user, audience } = useLoaderData();
  const [audienceMode, setAudienceMode] = useState(audience);

  const prayersFetcher = useFetcher();

  const handleModeChange = (mode: string) => {
    setAudienceMode(mode);
    prayersFetcher.load(`/prayers?audience=${mode}`);
  };

  return (
    <>
      <TopHeader />
      <div className="flex px-6 mb-2">
        <button
          onClick={() => handleModeChange('CHURCH')}
          className={`${
            audienceMode === 'CHURCH'
              ? 'active border-b-4 border-orem-500'
              : 'text-gray-400'
          } text-lg text-gray-200 min-w-[70px] text-center mr-2 px-1 py-2`}
        >
          <span className="group-[.active]:hidden mt-1">Igreja</span>
        </button>
        <button
          onClick={() => handleModeChange('CELL')}
          className={`${
            audienceMode === 'CELL'
              ? 'active border-b-4 border-orem-500'
              : 'text-gray-400'
          } text-lg text-gray-200 min-w-[70px] text-center  mr-2 px-1 py-2`}
        >
          <span className="group-[.active]:hidden mt-1">Célula</span>
        </button>
      </div>
      <List
        title={church.name}
        description="Lista com os últimos pedidos de oração"
        collection={prayers}
        user={user}
      />
      <MainFooter />
    </>
  );
};

export default Prayers;
