import React from 'react';
import { IUsersContext } from './interfaces/IUsersContext';
import { UserData } from './useUserList';

export const UsersContext = React.createContext<IUsersContext>({
  usersFilter: '',
  onChangeUsersFilter: (event: React.ChangeEvent<HTMLInputElement>) => {},
  isUserVerified: false,
  includeVerify: false,
  onChangeIncludeVerify: (_event: React.ChangeEvent<HTMLInputElement>) => {},
  onChangeUserVerified: (_event: React.ChangeEvent<HTMLInputElement>) => {},
  loading: false,
  hasMore: false,
  fetchedData: [],
  loadMore: async () => {
    return {} as UserData;
  },
  onFiltersSubmit: async (_event: React.MouseEvent<HTMLElement, MouseEvent>) => {},
});
