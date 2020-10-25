/* eslint no-useless-escape: 0 */
import { gql, useQuery } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';

export interface User {
  id: number;
  name: string;
  shortBio: string;
  isVerified: boolean;
  avatar: string;
}

export interface UserData {
  Users: {
    result: User[];
    count: number;
  };
}

interface UserVars {
  take?: number;
  skip?: number;
}

export interface IUseUserList {
  usersFilter: string;
  includeVerify: boolean;
  isUserVerified: boolean;
}

const GET_ROCKET_INVENTORY = (
  take: number,
  skip: number,
  usersFilter: string,
  includeVerify: boolean,
  isUserVerified?: boolean,
) =>
  gql(`
  query GetUsers {
    Users(take: ${take}, skip: ${skip}, filter: \"${usersFilter}\", ${
    includeVerify ? `isVerified: ${isUserVerified}` : ''
  }) {
      result {
        id
        name
        shortBio
        isVerified
        avatar,
      }
      count
    }
  }
`);

export function useUserList({ usersFilter, includeVerify, isUserVerified }: IUseUserList) {
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [fetchedData, setFetchedData] = useState<UserData['Users']['result']>([]);
  const [hasMore, setHasMore] = useState(false);

  const { loading, data, fetchMore, refetch } = useQuery<UserData, UserVars>(
    GET_ROCKET_INVENTORY(take, skip, usersFilter, includeVerify, isUserVerified),
    {
      notifyOnNetworkStatusChange: true,
    },
  );

  useEffect(() => {
    if (!!data) {
      setFetchedData([...fetchedData, ...data.Users.result]);
      setHasMore(fetchedData.length + take < data.Users.count);
    }
    // eslint-disable-next-line
  }, [data]);

  const loadMore = useCallback(async () => {
    const result = await fetchMore({
      query: GET_ROCKET_INVENTORY(take, skip + take, usersFilter, includeVerify, isUserVerified),
    });
    setSkip(skip + take);
    return result.data;
  }, [take, skip, fetchMore, usersFilter, includeVerify, isUserVerified]);

  return {
    loading,
    hasMore,
    fetchedData,
    loadMore,
    usersFilter,
    isUserVerified,
    setTake,
    setSkip,
    refetch,
    setFetchedData,
  };
}
