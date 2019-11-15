import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

import AddTaskItem from "./AddTaskItem";
import TaskItem from "./TaskItem";

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      filter: "all"
    };
  }

  showCompleted = () => {
    this.setState({ filter: "completed" });
  };
  showAll = () => {
    this.setState({ filter: "all" });
  };

  showIncompleted = () => {
    this.setState({ filter: "incompleted" });
  };

  loadTasks = () => {
    axios
      .get(`http://localhost:5000/lists/${this.props.match.params.id}/todos`)
      .then(response => {
        this.setState({ tasks: response.data });
      });
  };

  setItemStatus = (id, isCompleted) => {
    axios
      .put(`http://localhost:5000/todos/${id}`, {
        isCompleted
      })
      .then(() => this.loadTasks());
  };

  deleteTask = id => {
    axios
      .delete(`http://localhost:5000/todos/${id}`)
      .then(() => this.loadTasks());
  };

  componentDidMount() {
    this.loadTasks();
  }

  onKeyPress = (e, id) => {
    if (e.key === "Enter") {
      const name = e.target.value;
      e.target.value = "";
      axios
        .post(
          `http://localhost:5000/lists/${this.props.match.params.id}/todos`,
          {
            name: name,
            isCompleted: false
          }
        )
        .then(() => this.loadTasks());
    }
  };

  filterTasks = () => {
    if (this.state.filter === "all") {
      return this.state.tasks;
    }
    if (this.state.filter === "completed") {
      return this.state.tasks.filter(task => task.isCompleted);
    }
    return this.state.tasks.filter(task => !task.isCompleted);
  };

  render() {
    const tasks = this.filterTasks();

    return (
      <div className="box">
        <img src={require("./group.png")} className="image" alt={"img"} />
        <h4 className="heading">Todo tasks</h4>
        <AddTaskItem handleInput={this.onKeyPress} />

        <ul>
          {tasks.map(task => (
            <TaskItem
              task={task}
              handleClick={this.setItemStatus}
              handleDeleting={this.deleteTask}
              key={task.id}
            />
          ))}
        </ul>
        <div className="buttons">
          <p>Show:</p>
          <p
            className={this.state.filter === "all" ? "active" : ""}
            onClick={this.showAll}
          >
            All
          </p>
          <p
            className={this.state.filter === "completed" ? "active" : ""}
            onClick={this.showCompleted}
          >
            Completed
          </p>
          <p
            className={this.state.filter === "incompleted" ? "active" : ""}
            onClick={this.showIncompleted}
          >
            Incompleted
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(Tasks);
