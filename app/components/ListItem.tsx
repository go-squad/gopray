import React from 'react';

type ListItemProperties = {
  // temp
  item: any;
};

export const ListItem = ({ item }: ListItemProperties) => {
  return (
    <li className="flex flex-row">
      <div className="flex items-center flex-1 p-4 cursor-pointer select-none">
        <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
          <div className="relative block">
            <img
              alt="profile"
              src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
              className="mx-auto object-cover rounded-full h-10 w-10 "
            />
          </div>
        </div>
        <div className="flex-1 pl-1 mr-16">
          <div className="font-medium text-gray-300">{item.body}</div>
          <div className="text-sm text-gray-600">Leo Reis</div>
        </div>
        <div className="text-xs text-gray-600">6:00 AM</div>
      </div>
    </li>
  );
};
