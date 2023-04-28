import type { V2_MetaFunction } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react';
import { List } from '../components/List';
import { listPrayerRequests } from '../services/prayer.server';

export const loader = async () => {
  const prayers = await listPrayerRequests();

  return { prayers: prayers.slice(0, 10) };
};

const Prayers = () => {
  const { prayers } = useLoaderData();
  return (
    <List
      title="Igreja Oceânica"
      description="Lista com os últimos pedidos de oração"
      collection={prayers}
    />
  );
};

export default Prayers;
