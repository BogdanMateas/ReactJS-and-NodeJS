import React from "react";
import "./image.svg";
import { Link } from "react-router-dom";

const ListItem = props => (
  <div className="items">
    <Link id="link" to={`/tasks/${props.item.id}`}>
      <li
        onClick={e => {
          e.target.className = "active-list list";
        }}
        className="list"
      >
        {props.item.name}
      </li>
    </Link>
    <img
      src={require("./image.svg")}
      className="del"
      alt={"img"}
      onClick={() => props.handleDeleting(props.item.id)}
    />
  </div>
);

export default ListItem;
