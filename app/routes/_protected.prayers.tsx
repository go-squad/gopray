/* eslint-disable unicorn/no-null */
import { Audience, User } from '@prisma/client';
import { type LoaderFunction, type V2_MetaFunction } from '@remix-run/node';
import { NavLink, useLoaderData } from '@remix-run/react';
import RandomBibleReader from '~/components/bible-reader/BibleReader';

import { MainFooter } from '~/components/layout/MainFooter';
import { TopHeader } from '~/components/layout/TopHeader';
import { List } from '~/components/prayers/List';
import { Prayer } from '~/models/prayer.model';
import { getCellById } from '~/services/cell.server';
import { getChurch } from '~/services/church.server';
import {
  fetchPrayerRequestById,
  listPrayerRequests,
} from '~/services/prayer.server';
import { requireUser } from '~/services/session.server';
import { getUserById } from '~/services/user.server';

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

  let mentionedPrayer: Prayer | null = null;
  let mentionedUser: (User & { cellName: string | null }) | null = null;

  for (let prayer of prayers) {
    const mentionedId = prayer.mentionedId;
    if (mentionedId) {
      mentionedPrayer = mentionedId
        ? await fetchPrayerRequestById(mentionedId)
        : null;

      mentionedUser = mentionedPrayer
        ? await getUserById(mentionedPrayer.userId!)
        : null;

      if (mentionedPrayer && mentionedUser) {
        prayer.mention = {
          user: mentionedUser,
          prayer: mentionedPrayer,
        };
      }
    }
  }

  return {
    prayers: prayers?.slice(0, 10),
    church,
    user,
    cell,
    audience,
  };
};

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Prayers | Orem Club' }];
};

const Prayers = () => {
  const {
    prayers,
    church,
    user,
    cell,
    audience,
    mentionedPrayer,
    mentionedUser,
  } = useLoaderData();

  return (
    <>
      <TopHeader />
      <div className="flex px-6 pt-2 mb-px sticky top-0 bg-slate-950 z-10 ">
        <NavLink
          to="?audience=CHURCH"
          className={`${
            audience === 'CHURCH'
              ? 'active  border-orem-500'
              : 'text-gray-400 border-transparent'
          } flex text-lg border-b-4 justify-center items-center text-gray-200 min-w-[70px] text-center mr-2 px-1 pt-2 pb-1`}
        >
          <span className="group-[.active]:hidden">Igreja</span>
        </NavLink>
        <NavLink
          to="?audience=CELL"
          className={`${
            audience === 'CELL'
              ? 'active  border-orem-500'
              : 'text-gray-400 border-transparent'
          } text-lg border-b-4  flex justify-center items-center text-gray-200 min-w-[70px] text-center  mr-2 px-1 pt-2 pb-1`}
        >
          <span className="group-[.active]:hidden">Célula</span>
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
