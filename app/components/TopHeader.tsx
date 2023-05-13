import { ArrowSmallLeftIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { Link } from '@remix-run/react';
type HeaderProperties = {
  title: string;
  isHome?: boolean;
};

export const TopHeader = ({ title, isHome = true }: HeaderProperties) => {
  return (
    <div
      className="flex justify-center items-end pb-1 h-12 h-sa container px-6  font-bold text-l italic text-gray-400 
      shadow-2xl shadow-slate-950  fixed -top-px  bg-slate-900 z-30 max-w-[448px]"
    >
      <div className="flex justify-between items-center w-full">
        {isHome ? (
          <div></div>
        ) : (
          <Link to="/prayers">
            <ArrowSmallLeftIcon className="h-6 w-6 text-gray-400 mb-1" />
          </Link>
        )}

        <div>{title}</div>
        {isHome ? (
          <Link to="/profile">
            <UserCircleIcon className="h-6 w-6 text-gray-400 mb-1" />
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
