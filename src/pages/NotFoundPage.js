import classes from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={classes.page}>
      <div className={classes.errorCode}>404 Error</div>
      <div>Page not found!</div>
    </div>
  );
};

export default NotFoundPage;
