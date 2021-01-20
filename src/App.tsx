import {
  BrowserRouter as Router,
  Route as BaseRoute,
  Redirect,
  Switch,
} from "react-router-dom";

import { AuthProvider, useAuth } from "contexts/auth";
import { Loading, Dashboard, SignIn, Onboard } from "pages";
import { ModelProvider } from "contexts/model";

const Route = ({ render, ...props }: any) => {
  const { user, ready } = useAuth();

  return (
    <BaseRoute
      {...props}
      render={({ location }) => {
        if (!ready) {
          return <Loading />;
        }

        if (user) {
          return render();
        }

        return (
          <Redirect
            to={{
              pathname: "/sign-in",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

const PublicRoute = ({ render, ...props }: any) => {
  const { user, ready } = useAuth();

  return (
    <BaseRoute
      {...props}
      render={({ location }) => {
        if (!ready) {
          return <Loading />;
        }

        if (!user) {
          return render();
        }

        return (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

function App() {
  return (
    <AuthProvider>
      <ModelProvider>
        <Router>
          <Switch>
            <PublicRoute path="/sign-in" render={() => <SignIn />} />
            <Route path="/dashboard" render={() => <Dashboard />} />
            <Route path="/onboard" render={() => <Onboard />} />
            <Route
              exact
              path="/"
              render={() => {
                return (
                  <Redirect
                    to={{
                      pathname: "/dashboard",
                    }}
                  />
                );
              }}
            />
          </Switch>
        </Router>
      </ModelProvider>
    </AuthProvider>
  );
}

export default App;
