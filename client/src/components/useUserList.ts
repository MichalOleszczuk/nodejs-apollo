import { gql, useQuery } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  shortBio: string;
  isVerified: boolean;
  avatar: string;
}

interface UserData {
  Users: {
    result: User[];
    count: number;
  };
}

interface UserVars {
  take?: number;
  skip?: number;
}

const GET_ROCKET_INVENTORY = (take: number, skip: number) =>
  gql(`
  query GetUsers {
    Users(take: ${take}, skip: ${skip}) {
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

export function useUserList() {
  const [take] = useState(10);
  const [skip, setSkip] = useState(0);
  const [fetchedData, setFetchedData] = useState<UserData['Users']['result']>([]);
  const [hasMore, setHasMore] = useState(false);

  const { loading, data, fetchMore } = useQuery<UserData, UserVars>(GET_ROCKET_INVENTORY(take, skip), {
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (!!data) {
      setFetchedData([...fetchedData, ...data.Users.result]);
      setHasMore(fetchedData.length + take < data.Users.count);
    }
    // eslint-disable-next-line
  }, [data]);

  const loadMore = useCallback(async () => {
    const result = await fetchMore({
      query: GET_ROCKET_INVENTORY(take, skip + take),
    });
    setSkip(skip + take);
    return result.data;
  }, [take, skip, fetchMore]);

  return { loading, hasMore, fetchedData, loadMore };
}
