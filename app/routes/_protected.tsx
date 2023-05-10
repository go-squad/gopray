import { Outlet } from '@remix-run/react';

const Protected = () => {
  return (
    <div className="mt-12 mt-sa mb-4 max-w-md mx-auto">
      <Outlet />
    </div>
  );
};

export default Protected;
