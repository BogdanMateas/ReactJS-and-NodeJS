import React from "react";

const AddListItem = props => (
  <input
    onKeyPress={props.handleInput}
    placeholder="enter list"
    type="text"
    className="inputs"
  />
);

export default AddListItem;
