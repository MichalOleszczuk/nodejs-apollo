import { gql, useQuery } from '@apollo/client';
import React from 'react';

interface User {
  id: number;
  name: string;
  shortBio: string;
  isVerified: boolean;
}

interface UserData {
  Users: {
    result: User[];
    count: number;
  };
}

interface UserVars {
  name: string;
}

const GET_ROCKET_INVENTORY = gql(`
  query GetUsers {
    Users(take: 10) {
      result {
        id
        name
        shortBio
        isVerified
      }
      count
    }
  }
`);

export function UserList() {
  const { loading, data } = useQuery<UserData, UserVars>(GET_ROCKET_INVENTORY, {
    notifyOnNetworkStatusChange: true,
  });

  return (
    <div>
      <h3>Users</h3>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>ShortBio</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.Users &&
              data.Users.result.map((user) => (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.shortBio}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
