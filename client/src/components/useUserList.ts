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

  const { data, fetchMore } = useQuery<UserData, UserVars>(GET_ROCKET_INVENTORY(take, skip), {
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (!!data) {
      setFetchedData(currentData => [...currentData, ...data.Users.result]);
      setHasMore(fetchedData.length + take < data.Users.count);
    }
  }, [data]);

  const loadMore = useCallback(() => {
    return fetchMore({
      query: GET_ROCKET_INVENTORY(take, skip),
      variables: {
        take,
        skip,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;

        if (!!previousResult && skip < previousResult.Users.count) {
          setSkip(skip + take);
          return {
            ...previousResult,
            Users: {
              ...previousResult.Users,
              result: fetchMoreResult.Users.result,
              count: fetchMoreResult.Users.count,
            },
          };
        } else {
          return previousResult;
        }
      },
    });
  }, [take, skip, fetchMore]);

  return { hasMore, fetchedData, loadMore };
}
