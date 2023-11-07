import { ArrowSmallLeftIcon } from '@heroicons/react/24/solid';
import { Link } from '@remix-run/react';
import OremLogo from '../icons/OremLogo';

type HeaderProperties = {
  title?: string;
  isHome?: boolean;
  start?: any;
  end?: any;
};

export const TopHeader = ({
  title,
  isHome = true,
  start,
  end,
}: HeaderProperties) => {
  return (
    <div
      className="flex justify-between py-2 h-14 h-sa container px-4
      shadow-2xl shadow-slate-950  border-b border-orem-500.18  bg-slate-950 max-w-[448px]"
    >
      {/* start */}
      <div className="flex justify-start items-center w-full">
        {isHome ? (
          <div className="flex text-gray-200 items-center">
            <OremLogo />
          </div>
        ) : (
          <Link to="/prayers">
            <ArrowSmallLeftIcon className="h-7 w-7 text-gray-400 mb-1 mr-2" />
          </Link>
        )}
        {start}
      </div>

      {/* center */}
      <div className="flex flex-none text-center justify-between items-center">
        {title && (
          <div className="text-lg w-full text-center font-bold text-gray-300">
            {title}
          </div>
        )}
      </div>

      {/* end */}
      <div className="flex justify-end items-center w-full">{end}</div>
    </div>
  );
};
