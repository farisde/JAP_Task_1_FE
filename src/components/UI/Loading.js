import classes from "./Loading.module.css";
import { LoopCircleLoading } from "react-loadingg";

const Loading = (props) => {
  return (
    <div className={classes.container}>
      <LoopCircleLoading color={"whitesmoke"} display={"flex"} />
      <h2 className={classes.text}>{props.text}</h2>
    </div>
  );
};

export default Loading;
