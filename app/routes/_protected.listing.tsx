/* eslint-disable jsx-a11y/anchor-is-valid */
import { ArchiveBoxXMarkIcon, BookmarkIcon } from '@heroicons/react/24/solid';
import type { LoaderFunction, V2_MetaFunction } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import type { Key } from 'react';
import { MainFooter } from '~/components/MainFooter';
import { TopHeader } from '~/components/TopHeader';
import type { Prayer } from '~/models/prayer.model';
import { fetchPrayersByIds } from '~/services/prayer.server';
import { getSavedPrayersIdsByUserId } from '~/services/saved-prayers.server';
import { requireUser } from '~/services/session.server';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request);
  const prayersIds = await getSavedPrayersIdsByUserId(user.id);
  const prayers = await fetchPrayersByIds(prayersIds);

  return { prayers: prayers?.slice(0, 10), user };
};

export const meta: V2_MetaFunction = () => {
  return [{ title: 'List de Oração | Orem Club' }];
};

export const setAvatar = (prayer: Prayer) => {
  if (prayer?.avatarUrl) {
    return prayer.avatarUrl;
  } else if (prayer?.givenName && prayer?.surname) {
    return `${prayer.givenName.charAt(0)}${prayer.surname.charAt(0)}`;
  } else if (prayer?.username) {
    return `${prayer?.username.charAt(0)}`;
  } else {
    return `${prayer?.email?.charAt(0)}`;
  }
};

const Listing = () => {
  const { prayers } = useLoaderData();
  const prayerFetcher = useFetcher();

  const handlePrayerRemoval = (requestId: string) => {
    prayerFetcher.submit(
      { requestId, isSaved: true },
      {
        method: 'post',
        action: '/prayers/save-prayer',
      }
    );
  };

  return (
    <>
      <TopHeader title={'Lista de Oração'} isHome={false}></TopHeader>

      <div className="w-full max-w-md p-4 shadow sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <h5 className="flex text-xl font-bold leading-none text-gray-900 dark:text-white">
            <BookmarkIcon className="h-5 w-5 mr-2" />
            Recém Adicionados
          </h5>
        </div>
        <div className="flow-root">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700 mb-20">
            {prayers.map((item: Prayer, index: Key | null | undefined) => (
              <li key={index} className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-600">
                    {item.avatarUrl ? (
                      <img
                        alt=""
                        src={item.avatarUrl}
                        className="mx-auto object-cover rounded-full h-8 w-8"
                      />
                    ) : (
                      <span className="h-8 w-8 flex items-center justify-center font-medium text-gray-300">
                        {setAvatar(item)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {item.username}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {item.body}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-orem-500"
                    onClick={() => handlePrayerRemoval(item.id)}
                  >
                    <ArchiveBoxXMarkIcon className="w-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <MainFooter />
    </>
  );
};

export default Listing;
