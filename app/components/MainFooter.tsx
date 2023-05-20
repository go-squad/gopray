import { Link, NavLink } from '@remix-run/react';
import {
  HomeIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';

export const MainFooter = () => {
  return (
    <div className="flex justify-center divide-y divide-orem-500.18 pb-3 font-bold text-l text-gray-400 fixed inset-x-0 -bottom-px z-10 bg-slate-900">
      <div></div>
      <div className="w-full pt-4 mb-1 flex justify-around max-w-[448px]">
        <div className="flex justify-center min-w-[55px]">
          <NavLink
            to="/prayers"
            className={({ isActive, isPending }: any) =>
              `${
                isActive ? 'active bg-orem-500 rounded w-10 h-10' : ''
              } group flex justify-center flex-col items-center`
            }
          >
            <HomeIcon className="h-5 w-5 text-gray-400 group-[.active]:text-gray-950" />
            <span className="group-[.active]:hidden font-light text-xs mt-1">
              Pedidos
            </span>
          </NavLink>
        </div>
        <div className="flex justify-center min-w-[55px]">
          <NavLink
            to="/new"
            className={({ isActive, isPending }: any) =>
              `${
                isActive ? 'active bg-orem-500 rounded w-10 h-10' : ''
              } group flex justify-center flex-col items-center`
            }
          >
            <PlusCircleIcon className="h-5 w-5 text-gray-400 group-[.active]:text-gray-950" />
            <span className="group-[.active]:hidden font-light text-xs mt-1">
              Motivo
            </span>
          </NavLink>
        </div>
        <div className="flex justify-center min-w-[55px]">
          <NavLink
            to="/profile"
            className={({ isActive, isPending }: any) =>
              `${
                isActive ? 'active bg-orem-500 rounded w-10 h-10' : ''
              } group flex justify-center flex-col items-center`
            }
          >
            <UserCircleIcon className="h-5 w-5 text-gray-400 group-[.active]:text-gray-950" />
            <span className="group-[.active]:hidden font-light text-xs mt-1">
              Perfil
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

// className={`${(isActive: boolean) =>
//   isActive
//     ? 'bg-sky-500'
//     : ''} flex justify-center flex-col items-center min-w-[55px]`}
