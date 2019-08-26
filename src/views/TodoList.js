import React, { Component } from "react";
import Masonry from "react-masonry-component";
import Todo from "../components/Todo";
import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import moment from "moment";

class TodoList extends Component {
  state = {
    Low: true,
    Medium: true,
    High: true,
    Urgent: true,
    search: ""
  };

  handleChecked = event => {
    const { name, checked } = event.target;

    this.setState({
      [name]: checked
    });
  };
  handleSearch = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  render() {
    const { Low, Medium, High, Urgent } = this.state;
    let todos = this.props.todos;

    const filteredArray = todos.filter(todo => {
      return todo.finished;
    });
    const filteredArrayUnfinished = todos.filter(todo => {
      return !todo.finished;
    });
    filteredArray.sort(function(a, b) {
      return moment(b.createdAt).diff(moment(a.createdAt));
    });
    filteredArrayUnfinished.sort(function(a, b) {
      return moment(b.createdAt).diff(moment(a.createdAt));
    });
    todos = filteredArrayUnfinished.concat(filteredArray);

    let finalTodos = [];
    if (Low === true) {
      const filteredCheck = todos.filter(todo => {
        return todo.importance === "Low";
      });
      finalTodos = finalTodos.concat(filteredCheck);
    }
    if (Medium === true) {
      const filteredCheck = todos.filter(todo => {
        return todo.importance === "Medium";
      });
      finalTodos = finalTodos.concat(filteredCheck);
    }
    if (High === true) {
      const filteredCheck = todos.filter(todo => {
        return todo.importance === "High";
      });
      finalTodos = finalTodos.concat(filteredCheck);
    }
    if (Urgent === true) {
      const filteredCheck = todos.filter(todo => {
        return todo.importance === "Urgent";
      });
      finalTodos = finalTodos.concat(filteredCheck);
    }
    const { search } = this.state;
    if (search !== "") {
      finalTodos = finalTodos.filter(todo => {
        return todo.title.includes(search) || todo.text.includes(search);
      });
    }
    return (
      <>
        <input
          className="form-control mb-2"
          type="text"
          name="search"
          placeholder="Search ... "
          onChange={this.handleSearch}
          value={search}
        />
        <div>
          <span className="filter">
            <input
              type="checkbox"
              name="Low"
              onChange={this.handleChecked}
              checked={Low}
            />{" "}
            <div className="low" />
            Low
          </span>
          <span className="filter">
            <input
              type="checkbox"
              name="Medium"
              onChange={this.handleChecked}
              checked={Medium}
            />{" "}
            <div className="medium" />
            Medium
          </span>
          <span className="filter">
            <input
              type="checkbox"
              name="High"
              onChange={this.handleChecked}
              checked={High}
            />{" "}
            <div className="high" />
            High
          </span>
          <span className="filter">
            <input
              type="checkbox"
              name="Urgent"
              onChange={this.handleChecked}
              checked={Urgent}
            />{" "}
            <div className="urgent" />
            Urgent
          </span>
        </div>
        <br />

        <Masonry className="todos">
          <Link className="link-plus card plus todo mb-2" to="/add">
            <GoPlus className="plusko" /> Add new todo{" "}
          </Link>

          {finalTodos.map(todoData => {
            const handleFinishTodo = () => {
              todoData.finished = true;
              this.props.onEdit(todoData);
            };
            const handleRemoveTodo = () => this.props.onRemove(todoData);

            return (
              <Todo
                todo={todoData}
                key={todoData.id}
                onFinish={handleFinishTodo}
                onRemove={handleRemoveTodo}
              />
            );
          })}
        </Masonry>
      </>
    );
  }
}
export default TodoList;
