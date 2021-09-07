import { Fragment } from "react";
import { useSelector } from "react-redux";
import LoginForm from "./components/Authentication/LoginForm";
import RegisterForm from "./components/Authentication/RegisterForm";
import Header from "./components/Layout/Header";
import ContentTabs from "./components/Movies/ContentTabs";
import SearchBar from "./components/Movies/SearchBar";

function App() {
  const showLoginForm = useSelector((state) => state.auth.showLoginForm);
  const showRegisterForm = useSelector((state) => state.auth.showRegisterForm);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Fragment>
      <Header />
      {!showLoginForm && !showRegisterForm && <SearchBar />}
      {!showLoginForm && !showRegisterForm && <ContentTabs />}
      {!isLoggedIn && !showLoginForm && showRegisterForm && <RegisterForm />}
      {!isLoggedIn && showLoginForm && !showRegisterForm && <LoginForm />}
    </Fragment>
  );
}

export default App;
