import React, { memo, PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { IUsersContext } from './interfaces/IUsersContext';
import { UsersContext } from './users-context';
import { useUserList } from './useUserList';

function UsersState({ children }: PropsWithChildren<unknown>) {
  const [usersFilter, setUsersFilter] = useState('');
  const [includeVerify, setIncludeVerify] = useState(false);
  const [isUserVerified, setIsUserVerified] = useState(false);
  const { loading, hasMore, fetchedData, loadMore, setTake, setSkip, refetch, setFetchedData } = useUserList({
    includeVerify,
    usersFilter,
    isUserVerified,
  });

  const onChangeUsersFilter = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setUsersFilter(event.target.value);
  }, []);

  const onChangeUserVerified = useCallback(
    (_event: React.ChangeEvent<HTMLInputElement>) => {
      setIsUserVerified(!isUserVerified);
    },
    [isUserVerified],
  );

  const onFiltersSubmit = useCallback(
    (_event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      setTake(10);
      setSkip(0);
      setFetchedData([]);
      refetch();
    },
    [setTake, setSkip, refetch, setFetchedData],
  );

  const onChangeIncludeVerify = useCallback(
    (_event: React.ChangeEvent<HTMLInputElement>) => {
      setIncludeVerify(!includeVerify);
    },
    [includeVerify, setIncludeVerify],
  );

  const contextValue: IUsersContext = useMemo(() => {
    return {
      usersFilter,
      onChangeUsersFilter,
      isUserVerified,
      includeVerify,
      onChangeIncludeVerify,
      onChangeUserVerified,
      loading,
      hasMore,
      fetchedData,
      loadMore,
      onFiltersSubmit,
    };
  }, [
    usersFilter,
    onChangeUsersFilter,
    isUserVerified,
    includeVerify,
    onChangeIncludeVerify,
    onChangeUserVerified,
    loading,
    hasMore,
    fetchedData,
    loadMore,
    onFiltersSubmit,
  ]);
  return <UsersContext.Provider value={contextValue}>{children}</UsersContext.Provider>;
}

export default memo(UsersState);
