import React, { Component } from "react";
import Masonry from "react-masonry-component";
import Todo from "../components/Todo";

class TodoList extends Component {
  render() {
    return (
      <Masonry className="todos">
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
