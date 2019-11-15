import React from "react";

const AddTaskItem = props => (
  <input
    onKeyPress={props.handleInput}
    placeholder="enter task"
    type="text"
    className="inputs"
  />
);

export default AddTaskItem;
