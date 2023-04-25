import type { V2_MetaFunction } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react';
import { List } from '../components/List';
import { listPrayerRequests } from '../services/prayer.server';
import { TopHeader } from '~/components/TopHeader';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'GoPray' }];
};

export const loader = async () => {
  const prayers = await listPrayerRequests();

  return { prayers: prayers.slice(0, 10) };
};

const Index = () => {
  const { prayers } = useLoaderData();
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <TopHeader />
      <div className="mt-16 max-w-md mx-auto">
        <List
          title="Pedidos de oração"
          description="Lista com os últimos pedidos de oração"
          collection={prayers}
        />
      </div>
    </div>
  );
};

export default Index;
