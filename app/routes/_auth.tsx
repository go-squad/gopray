import type { V2_MetaFunction } from '@remix-run/react';
import { Outlet } from '@remix-run/react';

export const meta: V2_MetaFunction = (value: any) => {
  return [{ title: 'Auth | Orem+' }];
};

export default function Auth() {
  return <Outlet />;
}
