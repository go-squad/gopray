import { ArrowSmallLeftIcon } from '@heroicons/react/24/solid';
import { Link } from '@remix-run/react';
import OremLogo from '../icons/OremLogo';

type HeaderProperties = {
  title?: string;
  isHome?: boolean;
  children?: any;
};

export const TopHeader = ({
  title,
  isHome = true,
  children,
}: HeaderProperties) => {
  return (
    <div
      className="flex justify-center items-end py-2 h-14 h-sa container px-4
      shadow-2xl shadow-slate-950  border-b border-orem-500.18 fixed -top-px  bg-slate-950 z-30 max-w-[448px]"
    >
      <div className="flex justify-between items-center w-full">
        {isHome ? (
          <div className="flex text-gray-200 items-center">
            <OremLogo />
          </div>
        ) : (
          <Link to="/prayers">
            <ArrowSmallLeftIcon className="h-7 w-7 text-gray-400 mb-1" />
          </Link>
        )}

        {!isHome && <div className="text-lg text-gray-300">{title}</div>}
        {isHome ? (
          <div className="flex items-center">
            <span className="text-sm text-gray-400 mr-1">{title}</span>
          </div>
        ) : (
          <div className="min-w-[28px]">{children || ''}</div>
        )}
      </div>
    </div>
  );
};
