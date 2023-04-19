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
          <div className="font-medium text-gray-700">{item.title}</div>
          <div className="text-sm text-gray-600">Charlie Moi</div>
        </div>
        <div className="text-xs text-gray-600">6:00 AM</div>
        <button className="flex justify-end w-24 text-right">
          <svg
            width="20"
            fill="currentColor"
            height="20"
            className="text-pink-300 hover:text-pink-500"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
          </svg>
        </button>
      </div>
    </li>
  );
};
