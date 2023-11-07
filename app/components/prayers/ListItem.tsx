import {
  ArrowPathRoundedSquareIcon,
  ArrowUturnRightIcon,
} from '@heroicons/react/24/solid';
import type { User } from '@prisma/client';
import { NavLink, useFetcher } from '@remix-run/react';
import ReactTimeAgo from 'react-time-ago';
import type { Prayer } from '~/models/prayer.model';
import Avatar from '../avatar/Avatar';
import PrayIcon from '../icons/PrayIcon';
import DropdownMenuDemo, { PrayerOptions } from '../menus/DropdownMenu';
import MentionedPrayer from './MentionedPrayer';
import SavePrayer from './SavePrayer';
import ShowPrayerSupport from './ShowPrayerSupport';

type ListItemProperties = {
  item: Prayer;
  user: User;
};

export const ListItem = ({ item, user }: ListItemProperties) => {
  const fetcher = useFetcher();

  const handleShare = () => {
    const text = `Oi pessoal, vejam o motivo de oraçao que ${
      item.givenName || item.username
    } enviou no Orem recentemente: "${
      item.body
    }". Vamos orar por isso juntos!!? :)
    `;
    if (navigator.share) {
      navigator
        .share({
          title: 'Pedido de Oraçao',
          text,
          url: 'https://app.orem.club/',
        })
        .then(() => console.log('Successful share'))
        .catch(error => console.log('Error sharing', error));
    } else {
      const whatsappAppBAseUrl = 'https://api.whatsapp.com/send?text=';
      window.open(`${whatsappAppBAseUrl}${text}`, '_blank');
    }
  };

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleOptionsClick = async (action?: PrayerOptions) => {
    if (action === PrayerOptions.delete) {
      fetcher.submit(
        {
          id: item.id,
          body: item.body,
          userAction: 'delete',
        },
        {
          method: 'post',
          action: '/prayers/edit-prayer',
        }
      );
    }
  };

  return (
    <li
      className={`flex flex-col ${
        user.id === item.userId ? 'bg-sky-950/20' : 'bg-sky-950/5'
      }`}
    >
      {!item?.prayingCount && !item.saved && user.id !== item.userId && (
        <div className="pl-4 pt-3 praying-count flex items-start text-sm text-gray-400 ph-4">
          <div className="flex pt-[2px]">
            <PrayIcon svgFill="fill-gray-400" className="w-4 mb-px mr-1" />
            <span>Seja o primeiro à orar por essa causa. </span>
          </div>
        </div>
      )}
      <div className="prayerContent flex flex-col flex-1">
        <div
          className={`prayer-card transition duration-300 ease-out flex flex-col p-4 pb-2 justify-between`}
        >
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center">
              <Avatar
                url={item.avatarUrl}
                givenName={item.givenName}
                username={item.username}
                email={item.email}
              />
              <div className="flex items-center user-info  text-gray-400">
                <b className="text-gray-300 text-base">{item.username}</b>
                {user.id === item.userId && (
                  <span className="ml-1 text-sm">(você)</span>
                )}

                <span className="mx-1">•</span>
                <span className="text-sm"> célula {item.cell}</span>

                {item.createdAt !== item.updatedAt && (
                  <>
                    <span className="mx-1">•</span>
                    <em className="text-xs text-sky-500"> Editado</em>
                  </>
                )}
              </div>
            </div>
            <div>
              <DropdownMenuDemo
                id={item.id}
                onSelection={option => handleOptionsClick(option)}
              />
            </div>
          </div>
          <div className="pl-9 mb-2">
            <div className={`text-base text-gray-100 mb-1`}>{item.body}</div>
            {/* Mentioned Prayer */}

            {!!item.mention && (
              <MentionedPrayer
                mentionedUser={item.mention.user}
                mentionedPrayer={item.mention.prayer}
                currentUser={user}
              />
            )}
            <div className="time-ago flex items-center text-gray-400 mb-2">
              {item.createdAt && (
                <ReactTimeAgo
                  className="text-center text-sm"
                  timeStyle="round-minute"
                  date={new Date(item.createdAt)}
                  locale="pt-Br"
                />
              )}
            </div>

            {/* Statistics */}
            {item?.prayingCount && item?.prayingCount > 2 && (
              <div className="praying-count flex items-start text-sm text-gray-400 ph-4 mb-2">
                <div className="flex-1 pt-[2px]">
                  {item.saved && user.id !== item.userId && (
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
            <div className="prayer-button pt-2 flex justify-start gap-x-10 items-center">
              {user.id !== item.userId && (
                <ShowPrayerSupport
                  requestId={item.id}
                  isItemSaved={item.saved}
                />
              )}

              <NavLink
                to={`/motive?mentionId=${item.id}`}
                className="flex justify-center items-center"
              >
                <ArrowPathRoundedSquareIcon className="mb-px mr-1 h-5 w-5 fill-gray-400" />
              </NavLink>

              {user.id === item.userId ? undefined : (
                <SavePrayer
                  requestId={item.id}
                  isSavedInPrayerList={item.isSavedInPrayerList}
                />
              )}

              <button
                className="text-sm text-gray-400 flex items-center"
                type="button"
                onClick={() => handleShare()}
              >
                <ArrowUturnRightIcon className="h-5 w-5 mr-1 fill-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
