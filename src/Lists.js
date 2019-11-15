import React, { Component } from "react";
import axios from "axios";
import ListItem from "./ListItem";
import AddListItem from "./AddListItem";
import "./group.png";
import "./mystyle.css";

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  loadItems = () => {
    axios.get("http://localhost:5000/lists").then(response => {
      this.setState({ items: response.data });
    });
  };

  deleteItem = id => {
    axios
      .delete(`http://localhost:5000/lists/${id}`)
      .then(() => this.loadItems());
  };

  componentDidMount() {
    this.loadItems();
  }

  onKeyPress = e => {
    if (e.key === "Enter") {
      const name = e.target.value;
      e.target.value = "";
      axios
        .post("http://localhost:5000/lists", {
          name: name
        })
        .then(() => this.loadItems());
    }
  };

  render() {
    return (
      <div className="container">
        <div className="box">
          <img src={require("./group.png")} className="image" alt="img" />
          <h4 className="heading">Todo lists</h4>
          <AddListItem handleInput={this.onKeyPress} />
          <ul>
            {this.state.items.map(item => (
              <ListItem
                item={item}
                handleDeleting={this.deleteItem}
                handleShowing={this.showTasks}
                key={item.id}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Lists;
