import classes from "./ContentTabs.module.css";

const MediaTab = (props) => {
  return (
    <button
      className={`${classes.tabButton} ${
        props.isCorrectContentType && props.searchContent === ""
          ? classes.active
          : classes.toggleHover
      }`}
      onClick={props.handleMediaTabClick}
    >
      {props.name}
    </button>
  );
};

export default MediaTab;
