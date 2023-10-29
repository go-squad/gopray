import { type V2_MetaFunction } from '@remix-run/node';
import { NavLink, Outlet } from '@remix-run/react';

import { MainFooter } from '~/components/layout/MainFooter';
import { TopHeader } from '~/components/layout/TopHeader';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Prayers | Orem Club' }];
};

const Prayers = () => {
  return (
    <>
      <TopHeader />
      <div className="flex px-6 mb-2">
        <NavLink
          to="church-tab"
          className={({ isActive, isPending }: any) =>
            `${
              isActive ? 'active border-b-4 border-orem-500' : 'text-gray-400'
            } text-lg text-gray-200 min-w-[70px] text-center mr-2 px-1 py-2`
          }
        >
          <span className="group-[.active]:hidden mt-1">Igreja</span>
        </NavLink>
        <NavLink
          to="cell-tab"
          className={({ isActive, isPending }: any) =>
            `${
              isActive ? 'active border-b-4 border-orem-500' : 'text-gray-400'
            } text-lg text-gray-200 min-w-[70px] text-center  mr-2 px-1 py-2`
          }
        >
          <span className="group-[.active]:hidden mt-1">Célula</span>
        </NavLink>
      </div>
      <Outlet />
      <MainFooter />
    </>
  );
};

export default Prayers;
