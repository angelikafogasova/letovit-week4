import React, {Component} from 'react';
import Todo from '../components/Todo';

class TodoList extends Component {
    render () {
        const todos = this.props.todos;
return(
<>
{todos.map((todoData, index) => {
    const handleFinishTodo = () => {
      todoData.finished = true;
      this.props.onEdit(todoData, index);
    }
    const handleRemoveTodo = () => this.props.onRemove(index);
    
    return (
      <Todo
        todo={todoData}
        key={todoData.id}
        onFinish={handleFinishTodo}
        onRemove={handleRemoveTodo}
      />
    );
  })}
</>
)
}
}
export default TodoList