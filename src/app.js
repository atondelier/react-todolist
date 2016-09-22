import React from 'react';
import {render} from 'react-dom';

const Todo = ({name, done, id, onChange}) => (
  <div>
    <input type="checkbox" checked={done} onChange={onChange}/>
    {id} {name}
  </div>
);

const NewTodo = ({name, onSubmit, onChange}) => (
  <div>
    <input type="text" value={name} onChange={(event) => onChange(event.target.value)}/>
    <button onClick={onSubmit}>OK</button>
  </div>
);

class TodoList extends React.Component {
  
  state = {
    todos: [
      {id: 1, name: 'todo', done: false},
      {id: 2, name: 'todo', done: false},
      {id: 3, name: 'todo', done: true},
      {id: 4, name: 'todo', done: true}
    ],
    newTodo: {
      name: '',
      done: false
    }
  };

  checkTodo = (todo) => {
    const {todos} = this.state;
    const index = todos.indexOf(todo);
    this.setState({
      todos: [
        ...todos.slice(0, index),
        {...todos[index], done: !todos[index].done},
        ...todos.slice(index + 1)
      ]
    });
  };

  setNewTodoName = (name) => {
    this.setState({
      newTodo: { ...this.state.newTodo, name }
    });
  };
  
  createTodo = () => {
    const id = Math.max(...this.state.todos.map(todo => todo.id)) + 1;
    this.setState({
      todos: [...this.state.todos, {...this.state.newTodo, id}],
      newTodo: {
        name: '',
        done: false
      }
    });
  }
  
  render() {
    return (
      <div>
        <h2>Todo list</h2>
        <ul>
          {this.state.todos.map(todo => (
            <li><Todo {...todo} onChange={this.checkTodo.bind(this, todo)}/></li>
          ))}
          <li><NewTodo name={this.state.newTodo.name} onChange={this.setNewTodoName} onSubmit={this.createTodo}/></li>
        </ul>
      </div>
    );
  }
  
}

render(<TodoList/>, document.getElementById('app'));