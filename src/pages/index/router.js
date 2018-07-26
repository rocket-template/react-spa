/**
 * 页面路由
 */

import routes from './routes';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Layout from 'components/Layout/Layout';

export default function(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Layout {...props}>
          {routes.map((route, k) => (
            <Route
              exact
              key={k}
              path={route.path}
              render={() => {
                if (route.redirectTo) {
                  return <Redirect to={route.redirectTo} />;
                } else if (route.component) {
                  return <route.component {...props} />;
                }
                return null;
              }}
            />
          ))}
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}
