import { Fragment } from "react";
import Header from "./components/Layout/Header";
import MovieList from "./components/Movies/MovieList";
import Card from "./components/UI/Card";

function App() {
  return (
    <Fragment>
      <Header />
      <MovieList />
    </Fragment>
  );
}

export default App;
