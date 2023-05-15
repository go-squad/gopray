import { HandRaisedIcon } from '@heroicons/react/24/solid';
import React from 'react';

type ListItemProperties = {
  // temp
  item: any;
};

export const ListItem = ({ item }: ListItemProperties) => {
  return (
    <li className="flex mb-2">
      <div className="timeline flex flex-col">
        <div className="avatar relative block p-4">
          <img
            alt="profile"
            src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
            className="mx-auto object-cover rounded-full h-10 w-10 "
          />
        </div>
        <div className="time-ago flex flex-col items-center text-xs text-gray-400">
          <span className="text-sm">
            <b>2h</b>
          </span>
          <span>atrás</span>
        </div>
      </div>
      <div className="prayerContent flex flex-col flex-1">
        <div className="prayer-card bg-sky-950 flex flex-col p-4 pr-12 rounded mb-1">
          <div className="user-info text-xs text-gray-400 mb-1">
            <b className="text-gray-400">Arthur Junior</b> •{' '}
            <span>célula 128</span>
          </div>
          <div className="font-medium text-base text-gray-100 mb-6">
            {item.body}
          </div>
          <div className="prayer-button">
            <span className="text-xs text-gray-400 flex items-center">
              <HandRaisedIcon className="h-8 w-4 text-gray-400 mb-1 mr-2" />{' '}
              Orar por isso
            </span>
          </div>
        </div>
        <div className="praying-count flex items-center text-xs text-gray-400 p-4 pt-2 mb-4">
          <div className="flex -space-x-2 mr-2">
            <img
              className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-gray-800"
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
              alt="avatar1"
            />
            <img
              className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-gray-800"
              src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
              alt="avatar 2"
            />
            <img
              className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-gray-800"
              src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80"
              alt="avatar 3"
            />
          </div>
          <div>
            <b className="text-gray-300">Charles Lopes </b>
            <span> e outras</span>
            <b className="text-gray-300"> 122 </b>
            <span> pessoas orando.</span>
          </div>
        </div>
      </div>
    </li>
  );
};
