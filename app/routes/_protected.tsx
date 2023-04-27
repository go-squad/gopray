import { Outlet } from '@remix-run/react';
import { TopHeader } from '~/components/TopHeader';

const Protected = () => {
  return (
    <div className="mt-16 max-w-md mx-auto">
      <TopHeader></TopHeader>
      <Outlet />
    </div>
  );
};

export default Protected;
