/**
 * 页面路由
 */

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from 'mods/not-found/index';
import App from './App';
import * as auth from './auth';

export default function(props) {
  let entry = auth.authObject(props);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={properties => auth.authComps(properties, props)} />
        <Route path={entry[0]} render={() => <App {...props} />} />
        <Route
          render={() => {
            return <NotFound />;
          }}
        />
      </Switch>
    </BrowserRouter>
  );
}
