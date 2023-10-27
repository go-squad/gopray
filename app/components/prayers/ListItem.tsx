import {
  ArrowUturnRightIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/solid';
import type { User } from '@prisma/client';
import { useEffect, useState } from 'react';
import ReactTimeAgo from 'react-time-ago';
import type { Prayer } from '~/models/prayer.model';
import fallback from '../assets/images/pray.jpg';
import SavePrayer from './SavePrayer';
import ShowPrayerSupport from './ShowPrayerSupport';

type ListItemProperties = {
  // temp
  item: Prayer;
  user: User;
};

export const ListItem = ({ item, user }: ListItemProperties) => {
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (item?.avatarUrl) {
      setAvatar(item.avatarUrl);
    } else if (item?.givenName && item?.surname) {
      setAvatar(`${item.givenName.charAt(0)}${item.surname.charAt(0)}`);
    } else if (item?.username) {
      setAvatar(`${item?.username.charAt(0)}`);
    } else {
      setAvatar(`${item?.email?.charAt(0)}`);
    }
  }, [item]);

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleShare = () => {
    console.log('Handeling Share Click');
  };

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleOptionsClick = () => {
    console.log('Handeling Options Click');
  };
  return (
    <li className="flex mb-1">
      <div className="prayerContent flex flex-col flex-1">
        <div
          className={`prayer-card min-h-[130px] transition duration-300 ease-out  bg-sky-950/20 flex flex-col p-4 pb-2 rounded-md mb-1 justify-between ${
            item.saved ? 'shadow-glow' : ''
          }`}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="avatar relative block mr-2">
                {item.avatarUrl ? (
                  <img
                    alt="profile"
                    src={item.avatarUrl || fallback}
                    className="mx-auto object-cover rounded-full h-6 w-6 "
                  />
                ) : (
                  <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden rounded-full bg-gray-600">
                    <span className="font-medium text-gray-300">{avatar}</span>
                  </div>
                )}
              </div>
              <div className="user-info text-sm text-gray-400">
                <b className="text-gray-300">{item.username}</b>
                {user.id === item.userId && ' (você) '} •{' '}
                <span>célula {item.cell}</span>
              </div>
            </div>
            <div>
              <button
                className="text-xxs text-gray-400 flex flex-col items-center"
                type="button"
                onClick={() => handleOptionsClick()}
              >
                <EllipsisVerticalIcon className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
          <div className="pl-8">
            <div className={`text-sm text-gray-100 mb-2`}>{item.body}</div>
            <div className="time-ago flex items-center text-gray-400 mb-4">
              <ReactTimeAgo
                className="text-center text-xs"
                timeStyle="round-minute"
                date={new Date(item.createdAt)}
                locale="pt-Br"
              />
            </div>
            <div className="prayer-button pl-2 pt-2 w-full mb-2 flex justify-between items-center">
              <ShowPrayerSupport requestId={item.id} isItemSaved={item.saved} />

              {user.id === item.userId ? undefined : (
                <SavePrayer
                  requestId={item.id}
                  isSavedInPrayerList={item.isSavedInPrayerList}
                />
              )}

              <button
                className="text-xs text-gray-400 flex items-center"
                type="button"
                onClick={() => handleShare()}
              >
                <ArrowUturnRightIcon className="h-4 w-4 mr-1" />
                <span>Compartilhar</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mb-4 pl-8">
          {!item?.prayingCount && !item.saved && (
            <div className="praying-count flex items-start text-xs text-gray-400 ph-4 pt-1 pl-2">
              <div className="flex-1 pt-[2px]">
                <span>Seja o primeiro à orar por essa causa. </span>
              </div>
            </div>
          )}

          {item?.prayingCount && item?.prayingCount > 2 && (
            <div className="praying-count flex items-start text-xs text-gray-400 ph-4 pt-1 pl-3">
              <div className="flex-1 pt-[2px]">
                {item.saved && (
                  <>
                    <b className="text-gray-300">Você </b>
                    <span> e outras</span>
                  </>
                )}
                <b className="text-gray-300"> {item?.prayingCount || 0} </b>
                <span> pessoas orando.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};
