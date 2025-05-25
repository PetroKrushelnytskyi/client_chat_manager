import { UserContext, UserContextType } from '../../../contexts/User';
import { appRoutersList } from '../index';
import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

export const AppRoutes = () => {
  const { currentAccount }: UserContextType = useContext(UserContext);

  return (
    <Routes>
      {appRoutersList.map(
        ({ url, component: Component, componentWrapper: ComponentWrapper }) => (
          <Route
            key={url}
            path={url}
            element={
              ComponentWrapper ? (
                <ComponentWrapper user={currentAccount}>
                  <Component />
                </ComponentWrapper>
              ) : (
                <Component />
              )
            }
          />
        )
      )}
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
  );
};
