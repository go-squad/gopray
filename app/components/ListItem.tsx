import React, { useEffect, useState } from 'react';
import fallback from '../assets/images/pray.jpg';
import ReactTimeAgo from 'react-time-ago';
import { ClockIcon } from '@heroicons/react/24/solid';
import { Form, useNavigation } from '@remix-run/react';

type ListItemProperties = {
  // temp
  item: any;
};

export const ListItem = ({ item }: ListItemProperties) => {
  const [isItemSaved, setIsItemSaved] = useState(item?.saved);
  const [avatar, setAvatar] = useState('');
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== 'idle';

  useEffect(() => {
    if (item?.avatarUrl) {
      setAvatar(item.avatar);
    } else if (item?.givenName && item?.surname) {
      setAvatar(`${item.givenName.charAt(0)}${item.surname.charAt(0)}`);
    } else if (item?.username) {
      setAvatar(`${item?.username.charAt(0)}`);
    } else {
      setAvatar(`${item?.email?.charAt(0)}`);
    }
  }, [item]);

  const handleClick = async () => {
    setIsItemSaved((state: boolean) => !state);
  };

  return (
    <li className="flex mb-2 pr-4">
      <div className="timeline flex flex-col items-center">
        <div className="avatar relative block p-3">
          {item.avatarUrl ? (
            <img
              alt="profile"
              src={item.avatarUrl || fallback}
              className="mx-auto object-cover rounded-full h-10 w-10 "
            />
          ) : (
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-full bg-gray-600">
              <span className="font-medium text-gray-300">{avatar}</span>
            </div>
          )}
        </div>
        <div className="time-ago flex flex-col items-center text-xs text-gray-400 max-w-[58px]">
          <ClockIcon className="h-5 w-5 mb-2" />
          <ReactTimeAgo
            className="text-center text-xs"
            timeStyle="round-minute"
            date={new Date(item.createdAt)}
            locale="pt-Br"
          />
        </div>
      </div>
      <div className="prayerContent flex flex-col flex-1">
        <div
          className={`prayer-card min-h-[130px] transition duration-300 ease-out  bg-sky-950 flex flex-col p-4 pb-4 pr-12 rounded-md mb-1 justify-between ${
            isItemSaved ? 'shadow-glow' : ''
          }`}
        >
          <div className="user-info text-xs text-gray-400 mb-1">
            <b className="text-gray-400">{item.username}</b> •{' '}
            <span>célula {item.cell}</span>
          </div>
          <div className={`text-base text-gray-100 mb-5`}>{item.body}</div>
          <div className="prayer-button">
            <Form method="post">
              <input
                type="hidden"
                name="userId"
                id="userId"
                value={item.userId}
                readOnly
              />
              <input
                type="hidden"
                name="requestId"
                id="requestId"
                value={item.id}
                readOnly
              />
              <input
                type="hidden"
                name="prayAction"
                id="prayAction"
                value={isItemSaved ? 'on' : 'off'}
                readOnly
              />
              <button
                className="text-s text-gray-400 flex items-center"
                type="submit"
                disabled={isSubmitting}
                onClick={() => handleClick()}
              >
                <svg
                  className={`h-5 w-5  mb-px mr-2 ${
                    isItemSaved ? 'fill-sky-500' : 'fill-gray-400'
                  }`}
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 492.388 492.388"
                >
                  <g>
                    <path
                      d="M217.015,189.087c-15.393-5.529-32.371,2.48-37.893,17.882l-17.729,49.416l-1.777-30.452l56.055-155.7
      c3.762-10.393-0.752-22.195-10.865-27.299c-10.93-5.521-24.258-1.136-29.779,9.794L96.425,208.314
      c-1.682,3.361-2.673,7.264-2.673,11.282l0.416,117.078l-72.232,37.924C1.9,385.119-5.813,409.881,4.701,429.908
      c10.529,20.035,35.283,27.748,55.318,17.227l133.504-70.104l3.058-1.601c8.945-4.769,15.681-13.481,17.521-24.259l22.114-129.207
      C238.601,208.056,230.76,194.015,217.015,189.087z"
                    />
                    <path
                      d="M470.453,374.597l-72.232-37.924l0.416-117.078c0-4.018-0.991-7.921-2.673-11.282L317.363,52.727
      c-5.521-10.93-18.85-15.314-29.779-9.794c-10.113,5.104-14.626,16.905-10.865,27.299l56.055,155.7l-1.776,30.452l-17.729-49.416
      c-5.522-15.401-22.5-23.411-37.893-17.882c-13.746,4.929-21.587,18.97-19.203,32.877l22.115,129.207
      c1.84,10.778,8.576,19.491,17.521,24.259l3.058,1.601l133.504,70.104c20.035,10.521,44.789,2.808,55.318-17.227
      C498.201,409.881,490.488,385.119,470.453,374.597z"
                    />
                  </g>
                </svg>
                <span className={isItemSaved ? 'text-sky-500' : ''}>Orar</span>
              </button>
            </Form>
          </div>
        </div>
        <div className="praying-count flex items-start text-xs text-gray-400 p-4 pt-2 mb-4">
          <div className="flex -space-x-2 mr-2">
            <img
              className="inline-block h-5 w-5 rounded-full ring-2 ring-gray-800"
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
              alt="avatar1"
            />
            <img
              className="inline-block h-5 w-5 rounded-full ring-2 ring-gray-800"
              src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
              alt="avatar 2"
            />
          </div>
          <div className="flex-1 pt-[2px]">
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
