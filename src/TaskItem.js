import React from "react";
import "./image.svg";

const TaskItem = props => (
  <div className="task">
    <label>
      <input
        type="checkbox"
        onChange={() =>
          props.handleClick(props.task.id, !props.task.isCompleted)
        }
        checked={props.task.isCompleted ? "checked" : ""}
      ></input>
      <span className="checkmark"></span>
      {props.task.name}
    </label>
    <img
      src={require("./image.svg")}
      className="del"
      alt="img"
      onClick={() => props.handleDeleting(props.task.id)}
    />
  </div>
);

export default TaskItem;
