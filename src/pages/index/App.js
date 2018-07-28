import routes from './routes';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFound from 'mods/not-found/index';
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Switch>
        {routes.map((route, k) => (
          <Route
            exact
            key={k}
            path={route.path}
            render={properties => {
              if (route.redirectTo) {
                return <Redirect to={route.redirectTo} />;
              } else if (route.component) {
                return <route.component {...properties} attrs={this.props} />;
              }
              return null;
            }}
          />
        ))}
        <Route
          render={() => {
            return <NotFound />;
          }}
        />
      </Switch>
    );
  }
}
