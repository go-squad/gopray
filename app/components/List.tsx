import React from 'react';
import { ListItem } from './ListItem';

type ListProperties = {
  title: string;
  description: string;
  collection: [];
};
export const List = ({ title, description, collection }: ListProperties) => {
  return (
    <div className="container divide-y divide-slate-700 flex flex-col items-center justify-center w-full mx-auto bg-slate-900 rounded-lg shadow">
      <div></div>

      {collection.length === 0 ? (
        <p className="p-4 text-gray-400">
          Está célula não possui nenhum pedido de oração ainda.
        </p>
      ) : (
        <ul className="flex flex-col w-full divide-y divide-slate-700">
          {collection.map((item, index) => (
            <ListItem key={index} item={item} />
          ))}
          <li className="mb-16"></li>
        </ul>
      )}
    </div>
  );
};
