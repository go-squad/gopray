import { Audience } from '@prisma/client';
import { type LoaderFunction, type V2_MetaFunction } from '@remix-run/node';
import { NavLink, useLoaderData } from '@remix-run/react';
import RandomBibleReader from '~/components/bible-reader/BibleReader';

import { MainFooter } from '~/components/layout/MainFooter';
import { TopHeader } from '~/components/layout/TopHeader';
import { List } from '~/components/prayers/List';
import { getCellById } from '~/services/cell.server';
import { getChurch } from '~/services/church.server';
import { listPrayerRequests } from '~/services/prayer.server';
import { requireUser } from '~/services/session.server';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(await request.url);
  const audience =
    (url.searchParams.get('audience') as unknown as Audience) || Audience.CELL;
  const user = await requireUser(request);
  const churchId = user?.churchId;
  const church = await getChurch({ churchId });
  const cellId = user?.cellId;
  const cell = await getCellById(cellId);

  let prayers = await listPrayerRequests({
    id: audience === Audience.CHURCH ? churchId : cellId,
    loggedUserId: user.id,
    audience,
  });

  return { prayers: prayers?.slice(0, 10), church, user, cell, audience };
};

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Prayers | Orem Club' }];
};

const Prayers = () => {
  const { prayers, church, user, cell, audience } = useLoaderData();

  return (
    <>
      <TopHeader />
      <div className="flex px-6 mb-px">
        <NavLink
          to="?audience=CHURCH"
          className={`${
            audience === 'CHURCH'
              ? 'active border-b-4 border-orem-500'
              : 'text-gray-400'
          } text-lg text-gray-200 min-w-[70px] text-center mr-2 px-1 py-2`}
        >
          <span className="group-[.active]:hidden mt-1">Igreja</span>
        </NavLink>
        <NavLink
          to="?audience=CELL"
          className={`${
            audience === 'CELL'
              ? 'active border-b-4 border-orem-500'
              : 'text-gray-400'
          } text-lg text-gray-200 min-w-[70px] text-center  mr-2 px-1 py-2`}
        >
          <span className="group-[.active]:hidden mt-1">Célula</span>
        </NavLink>
      </div>

      <List
        className="mb-2"
        title={audience === Audience.CHURCH ? church.name : cell.name}
        collection={prayers}
        user={user}
        audience={audience}
      />

      {prayers.length > 0 && <RandomBibleReader className="mb-28" />}
      <MainFooter />
    </>
  );
};

export default Prayers;
