import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'react-virtualized/styles.css';
import { useUserList } from './useUserList';

const style = {
  height: 50,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

export function UserList() {
  const { hasMore, fetchedData, loadMore } = useUserList();

  return (
    <InfiniteScroll
      dataLength={fetchedData.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      {fetchedData.map((i, index) => (
        <div style={style} key={index}>
          div - #{index} {i.name}
        </div>
      ))}
    </InfiniteScroll>
  );

  // return (
  //   <div>
  //     <h3>Users</h3>
  //     {loading ? (
  //       <p>Loading ...</p>
  //     ) : (
  //       <table>
  //         <thead>
  //           <tr>
  //             <th>Name</th>
  //             <th>ShortBio</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {data &&
  //             data.Users &&
  //             data.Users.result.map((user) => (
  //               <tr key={user.id}>
  //                 <td>{user.name}</td>
  //                 <td>{user.shortBio}</td>
  //               </tr>
  //             ))}
  //         </tbody>
  //       </table>
  //     )}
  //   </div>
  // );
}
