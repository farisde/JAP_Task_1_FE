import { Fragment } from "react";
import LoginForm from "./components/Authentication/LoginForm";
import RegisterForm from "./components/Authentication/RegisterForm";
import Header from "./components/Layout/Header";
import ContentTabs from "./components/Movies/ContentTabs";
import SearchBar from "./components/Movies/SearchBar";

function App() {
  return (
    <Fragment>
      <Header />
      {/* <SearchBar />
      <ContentTabs /> */}

      <LoginForm />
    </Fragment>
  );
}

export default App;
