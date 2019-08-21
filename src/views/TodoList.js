import React, { Component } from "react";
import Masonry from "react-masonry-component";
import Todo from "../components/Todo";
import { Link } from 'react-router-dom';
import { GoPlus } from "react-icons/go";

class TodoList extends Component {
  render() {
    return (
      <Masonry className="todos">
        <Link className="link-plus card plus todo mb-2" to="/add">
        <GoPlus className="plusko" /> Add new todo </Link>

        {this.props.todos.map(todoData => {
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
    );
  }
}
export default TodoList;
