import React, { memo, PropsWithChildren } from 'react';
import UsersState from './users/UsersState';

function GlobalState({ children }: PropsWithChildren<unknown>) {
  return <UsersState>{children}</UsersState>;
}

export default memo(GlobalState);
