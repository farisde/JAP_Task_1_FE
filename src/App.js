import { Fragment } from "react";
import Header from "./components/Layout/Header";
import ContentTabs from "./components/Movies/ContentTabs";
import SearchBar from "./components/Movies/SearchBar";

function App() {
  return (
    <Fragment>
      <Header />
      <SearchBar />
      <ContentTabs />
    </Fragment>
  );
}

export default App;
