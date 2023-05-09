import { ArrowSmallLeftIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { Link } from '@remix-run/react';
type HeaderProperties = {
  title: string;
  isHome?: boolean;
};

export const TopHeader = ({ title, isHome = true }: HeaderProperties) => {
  return (
    <div
      className="header-standalone flex justify-center  h-12 container max-w-md mx-auto px-6  font-bold text-l italic text-gray-400 
      shadow-2xl shadow-slate-950  fixed -top-px  bg-white dark:bg-slate-900"
    >
      <div className="flex justify-between items-center w-full">
        {isHome ? (
          <div></div>
        ) : (
          <Link to="/">
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
