import { Outlet } from '@remix-run/react';
import { MainFooter } from '~/components/MainFooter';
import { TopHeader } from '~/components/TopHeader';

const Protected = () => {
  return (
    <div className="mt-11 mb-16 max-w-md mx-auto">
      <TopHeader />
      <Outlet />
      <MainFooter />
    </div>
  );
};

export default Protected;
