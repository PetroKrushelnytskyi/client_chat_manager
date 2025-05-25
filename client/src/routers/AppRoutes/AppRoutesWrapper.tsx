import { RouterOutputs } from '../../../lib/trpc';
import React from 'react';
import { Navigate } from 'react-router-dom';

import { homeUrl, singInUrl } from '..';

type RedirectArgsType = {
  user?: RouterOutputs['currentAccount'] | null;
  children: React.ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RedirectType = any;

export const AuthorizedRequiredForPage = ({
  user,
  children
}: RedirectArgsType): RedirectType => {
  if (!user) {
    return <Navigate to={singInUrl} />;
  }

  return children;
};

export const NotAuthorizedForPage = ({
  user,
  children
}: RedirectArgsType): RedirectType => {
  if (user) {
    return <Navigate to={homeUrl} />;
  }

  return children;
};
