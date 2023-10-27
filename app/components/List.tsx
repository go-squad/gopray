import React from 'react';
import { ListItem } from './ListItem';
import type { User } from '@prisma/client';
import { Prayer } from '~/models/prayer.model';

type ListProperties = {
  title: string;
  description: string;
  collection: Prayer[];
  user: User;
};
export const List = ({
  title,
  description,
  collection,
  user,
}: ListProperties) => {
  return (
    <div className="container flex flex-col items-center justify-center w-full mx-auto bg-slate-950 rounded-lg shadow">
      {collection.length === 0 ? (
        <p className="p-4 text-gray-400">
          Está célula não possui nenhum pedido de oração ainda.
        </p>
      ) : (
        <ul className="flex flex-col w-full">
          {collection.map((item, index) => (
            <ListItem key={index} item={item} user={user} />
          ))}
          <li className="mb-16"></li>
        </ul>
      )}
    </div>
  );
};
