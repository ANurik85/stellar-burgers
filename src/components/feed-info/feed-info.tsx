import { FC, useEffect } from 'react';
import { useSelector } from '../../services/store';
import { RootState } from '../../services/rootReducer';
import { TOrder, TOrdersData } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

const getOrders = (orders: TOrder[], status: string): number[] => {
  const filtered = orders.filter((item) => item.status === status);
  return filtered.map((item) => item.number).slice(0, 20);
};

export const FeedInfo: FC = () => {
  const { orders, total, totalToday } = useSelector(
    (state: RootState & { feed: TOrdersData }) => state.feed
  );

  const feed = { total, totalToday };
  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = [
    ...getOrders(orders, 'pending'),
    ...getOrders(orders, 'created')
  ];
  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
