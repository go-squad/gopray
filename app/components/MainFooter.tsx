import { Link } from '@remix-run/react';
import { PlusCircleIcon } from '@heroicons/react/24/solid';

export const MainFooter = () => {
  return (
    <div className="flex justify-center divide-y divide-slate-700 pb-3 font-bold text-l text-gray-400 fixed inset-x-0 -bottom-px z-10 bg-white dark:bg-slate-900">
      <div></div>
      <div className="w-full pt-4 mb-4">
        <Link to="new" className="flex justify-center flex-col items-center">
          <PlusCircleIcon className="h-6 w-6 text-gray-400 mb-1" />
          <span className="font-light text-xs">Motivo</span>
        </Link>
      </div>
    </div>
  );
};
