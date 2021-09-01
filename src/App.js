import { Fragment } from "react";
import Header from "./components/Layout/Header";
import MovieList from "./components/Movies/MovieList";

function App() {
  return (
    <Fragment>
      <Header />
      <MovieList />
    </Fragment>
  );
}

export default App;
