import { Audience, User } from '@prisma/client';
import type { Prayer } from '~/models/prayer.model';
import { EmptyState } from '../empty-state/EmptyState';
import ChurchIllustration from '../illustrations/ChurchIllustration';
import SocialHourIllustration from '../illustrations/SocialHour';
import { ListItem } from './ListItem';

type ListProperties = {
  title: string;
  collection: Prayer[];
  user: User;
  audience: Audience;
  className?: string;
};
export const List = ({
  title,
  collection,
  user,
  audience,
  className,
}: ListProperties) => {
  return (
    <div
      className={`container flex flex-col items-center justify-center w-full mx-auto bg-slate-950 rounded-lg shadow ${className}`}
    >
      <div className="bg-sky-950 w-full h-[200px] p-4 flex items-center">
        {audience !== Audience.CHURCH && (
          <SocialHourIllustration className="w-2/3 h-full" />
        )}
        <div className="text-gray-100 text-center w-1/3">
          <h3 className="text-gray-300 text-sm">
            {audience === Audience.CHURCH ? 'Igreja' : 'Célula'}
          </h3>
          <span className="font-extrabold text-3xl">{title}</span>
        </div>
        {audience === Audience.CHURCH && (
          <ChurchIllustration className="w-2/3 h-full" />
        )}
      </div>
      {collection.length === 0 ? (
        <EmptyState
          className="mt-4 w-2/3"
          title="Que pena! Ainda não há nenhuma oração por aqui :("
          content="Que tal ser o primeiro?"
        />
      ) : (
        <ul className="flex flex-col w-full divide-y divide-gray-700">
          {collection.map((item, index) => (
            <ListItem key={index} item={item} user={user} />
          ))}
        </ul>
      )}
    </div>
  );
};
