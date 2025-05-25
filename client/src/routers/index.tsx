import { Navigate } from 'react-router-dom';
import { NotAuthorizedForPage } from './AppRoutes/AppRoutesWrapper';
import Users from '@client/components/Users/User';
import { SingIn } from '@client/components/SingIn/index';

export const singInUrl = '/sing-in';
export const homeUrl = '/users';

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
}

];