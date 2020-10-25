import { User, UserData } from '../useUserList';

export interface IUsersContext {
  usersFilter: string;
  onChangeUsersFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isUserVerified: boolean;
  includeVerify: boolean;
  onChangeIncludeVerify: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeUserVerified: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  hasMore: boolean;
  fetchedData: User[];
  loadMore: () => Promise<UserData>;
  onFiltersSubmit: (_event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}
