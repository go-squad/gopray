import React from 'react';
import avatar from 'images/profile.png';

type ListItemProperties = {
  // temp
  item: any;
};

export const ListItem = ({ item }: ListItemProperties) => {
  return (
    <li className="flex flex-row">
      <div className="flex items-center flex-1 p-4 cursor-pointer select-none">
        <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
          <a href="#" className="relative block">
            <img
              alt="profile image"
              src={avatar}
              className="mx-auto object-cover rounded-full h-10 w-10 "
            />
          </a>
        </div>
        <div className="flex-1 pl-1 mr-16">
          <div className="font-medium text-gray-300">{item.title}</div>
          <div className="text-sm text-gray-600">Charlie Moi</div>
        </div>
        <div className="text-xs text-gray-600">6:00 AM</div>
      </div>
    </li>
  );
};
