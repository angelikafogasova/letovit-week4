import React, { Component } from "react";
import { HashRouter, Switch, Route } from 'react-router-dom';
import moment from "moment";
import axios from "./axios";

import TodoList from "./views/TodoList";
import AddTodo from "./views/AddTodo";

class App extends Component {
  state = {
    todos: []
  };

  async componentDidMount() {
    const todos = await axios.get("/todos.json");
    console.log(todos);
    const result = [];

    if (todos.data)
      Object.keys(todos.data).forEach(key => {
        const todo = todos.data[key];
        todo.id = key;
        result.push(todo);
      });
    this.setState({
      todos: result
    });
  }

  addTodo = async todo => {
    const newTodo = {
      ...todo,
      createdAt: moment().format("DD.MM.YYYY"),
      finished: false
    };

    const result = await axios.post("/todos.json", newTodo);
    newTodo.id = result.data.name;

    this.setState(prevState => {
      return {
        todos: prevState.todos.concat(newTodo)
      };
    });
  };

  editTodo = (todo, index) => {
    const todos = [...this.state.todos];
    todos.splice(index, 1, todo);
    this.setState({
      todos: todos
    });
  };

  removeTodo = index => {
    const todos = [...this.state.todos];
    todos.splice(index, 1);
    this.setState({
      todos: todos
    });
  };

  render() {
    const { todos } = this.state;
    return (
      <div className="App p-3">
        <HashRouter>
          <Switch>
            <Route
              path="/add"
              exact
              render={() => <AddTodo onAdd={this.addTodo}/>}
            />
            <Route
              path="/"
              exact
              render={() => <TodoList onEdit={this.editTodo} onRemove={this.removeTodo} todos={todos}/>}
              />
          </Switch>
        </HashRouter>        
      </div>
    );
  }
}

export default App;
