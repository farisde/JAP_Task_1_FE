import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../components/Layout/Header";
import links from "../links/links";
import LandingPage from "../pages/LandindPage";
import NotFoundPage from "../pages/NotFoundPage";
import SigninPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";

const Routes = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path={links.signup.url}>
          <SignUpPage />
        </Route>
        <Route exact path={links.signin.url}>
          <SigninPage />
        </Route>
        <Route exact path={[links.home.url, links.search.url, links.media.url]}>
          <LandingPage />
        </Route>
        <Route path={links.any.url}>
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
