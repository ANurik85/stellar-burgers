import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { fetchFeed } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const { orders } = useSelector((state: RootState) => state.feed);

  useEffect(() => {
    if (!orders || !orders.length) {
      dispatch(fetchFeed());
    }
  }, []);

  if (!orders || !orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeed())} />
  );
};
