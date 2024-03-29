import { Outlet } from '@remix-run/react';

const Protected = () => {
  return (
    <div className="mt-sa mb-4 max-w-md mx-auto">
      <Outlet />
    </div>
  );
};

export default Protected;
