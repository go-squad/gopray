import type { V2_MetaFunction } from '@remix-run/react';
import { Outlet } from '@remix-run/react';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Auth | Ore+' }];
};

export default function Auth() {
  return <Outlet />;
}
