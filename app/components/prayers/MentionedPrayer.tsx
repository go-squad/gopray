import type { User } from '@prisma/client';
import ReactTimeAgo from 'react-time-ago';
import type { Prayer } from '~/models/prayer.model';
import Avatar from '../avatar/Avatar';

const MentionedPrayer = ({
  mentionedUser,
  mentionedPrayer,
  currentUser,
}: {
  mentionedUser: User & { cellName: string };
  mentionedPrayer: Prayer;
  currentUser: User;
}) => {
  return (
    <div className="w-full p-3 border-[1px] border-gray-800 rounded my-2">
      <div className="flex items-center mb-2">
        <Avatar
          url={mentionedUser.avatarUrl}
          givenName={mentionedUser.givenName}
          email={mentionedUser.email}
        />
        <div className="flex items-center user-info  text-gray-400">
          <b className="text-gray-300 text-base">
            {mentionedUser.displayName || mentionedUser.givenName}
          </b>
          {mentionedUser.id === currentUser.id && (
            <span className="ml-1 text-sm">(você)</span>
          )}
          <span className="mx-1">•</span>
          <span className="text-sm truncate overflow-hidden">
            célula {mentionedUser.cellName}
          </span>
        </div>
      </div>
      <div className="mb-2">
        <div className={`text-base text-gray-100 mb-1`}>
          {mentionedPrayer.body}
        </div>
        {mentionedPrayer.createdAt && (
          <ReactTimeAgo
            className="text-center text-sm text-gray-400"
            timeStyle="round-minute"
            date={new Date(mentionedPrayer.createdAt)}
            locale="pt-Br"
          />
        )}
      </div>
    </div>
  );
};

export default MentionedPrayer;
