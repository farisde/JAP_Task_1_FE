import { Fragment } from "react";
import Header from "./components/Layout/Header";
import ContentTabs from "./components/Movies/ContentTabs";
import MovieList from "./components/Movies/MovieList";

function App() {
  return (
    <Fragment>
      <Header />
      <ContentTabs />
    </Fragment>
  );
}

export default App;
