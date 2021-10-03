import { Fragment } from "react";
import ContentTabs from "../components/Media/ContentTabs";
import SearchBar from "../components/Media/SearchBar";

const LandingPage = () => {
  return (
    <Fragment>
      <SearchBar />
      <ContentTabs />
    </Fragment>
  );
};

export default LandingPage;
