import React from 'react';
import { ListItem } from './ListItem';

type ListProperties = {
  title: string;
  description: string;
  collection: [];
};
export const List = ({ title, description, collection }: ListProperties) => {
  return (
    <div className="container flex flex-col items-center justify-center w-full mx-auto bg-white rounded-lg shado">
      <div className="w-full px-4 py-5 border-b sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-pink-600">{title}</h3>
        <p className="max-w-2xl mt-1 text-sm text-gray-500">{description}</p>
      </div>
      <ul className="flex flex-col divide-y divide">
        {collection.map((item, index) => (
          <ListItem key={index} item={item} />
        ))}
      </ul>
    </div>
  );
};
