import { Outlet } from '@remix-run/react';
import { MainFooter } from '~/components/MainFooter';
import { TopHeader } from '~/components/TopHeader';

const Protected = () => {
  return (
    <div className="mt-12 mb-4 max-w-md mx-auto">
      <Outlet />
    </div>
  );
};

export default Protected;
