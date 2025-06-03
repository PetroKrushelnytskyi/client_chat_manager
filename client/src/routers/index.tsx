import { Navigate } from 'react-router-dom';
import { NotAuthorizedForPage } from './AppRoutes/AppRoutesWrapper';
import Users from '@client/components/Users/User';
import { SingIn } from '@client/components/SingIn/index';
import Meneger from '@client/components/Meneger/Meneger';

export const singInUrl = '/sing-in';
export const homeUrl = '/users';
export const menegerUrl = '/meneger';

export const appRoutersList = [
  {
    url: '/',
    component: () => <Navigate to={homeUrl} />,
  },
  {
    url: singInUrl,
    component: SingIn,
    componentWrapper: NotAuthorizedForPage,
  },
  {
    url: `${homeUrl}/:id?`,
    component: Users,
  },
  {
    url: `${menegerUrl}/:id?`,
    component: Meneger,
  },
];
