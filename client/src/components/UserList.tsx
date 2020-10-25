import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'react-virtualized/styles.css';
import { useUserList } from './useUserList';

const style = {
  height: 50,
  border: '1px solid green',
  margin: 6,
  padding: 8,
};

export function UserList() {
  const { loading, hasMore, fetchedData, loadMore } = useUserList();

  if (loading) return <h4>Loading...</h4>;

  return (
    <InfiniteScroll dataLength={fetchedData.length} next={loadMore} hasMore={hasMore} loader={<h4>Loading...</h4>}>
      {fetchedData.map((i, index) => (
        <div style={style} key={index}>
          div - #{index} {i.name}
        </div>
      ))}
    </InfiniteScroll>
  );
}
