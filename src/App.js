import React from 'react'
import Add from './Add.js';
import './App.css'
import './base.css'
import List from './List.js'
import Filter from './Filter.js'

let localStorage = window.localStorage

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      todos: localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [],
      filter: {isFilter: false, filterValue: null},
    }
    this.newTodos = this.state.todos
    this.newFilter = this.state.filter
  }


  setLocal = (name,value) => {
    window.localStorage.setItem(name,JSON.stringify(value))
  }

  addTodo = (title) => {
    this.newTodos.push({
      title: title,
      completed: false
    })
    this.setState({todos: this.newTodos}, () => this.setLocal('todos', this.newTodos))

  }

  deleteTodo = (index) => {
    this.newTodos = this.newTodos.filter((todo, count) => count !== index && todo)
    this.setState({todos: this.newTodos}, () => this.setLocal('todos', this.newTodos))
  }

  toggleComplete = (index) => {
    this.newTodos[index].completed = !this.newTodos[index].completed
    this.setState({todos: this.newTodos}, () => this.setLocal('todos', this.newTodos))
  }

  toggleAll = () => {
    let isToggleAll = false
    this.newTodos.map(todo => !todo.completed ? isToggleAll = true : null)
    this.newTodos.map(todo => isToggleAll === true ? todo.completed = true : todo.completed = false)
    this.setState({todos : this.newTodos}, () => this.setLocal('todos', this.newTodos))
  }

  checkFilter = (filter) => {
    //  filterValue = null
    // khi ham chay set lai state isFilter: true,  filterValue: ...
    // gan them callBack cho setState
    // In ra isFilter va filterValue thu
    if (filter === 'active') {
      this.newFilter.isFilter = true
      this.newFilter.filterValue = this.state.todos.filter(item => !item.completed)
      this.setState({filter: this.newFilter}, () => null)

      return
    }
    if (filter === 'completed') {
      this.newFilter.isFilter = true
      this.newFilter.filterValue = this.state.todos.filter(item => item.completed)
      this.setState({filter: this.newFilter}, () => null)

      return
    }
    if (filter === 'all') {
      this.newFilter.isFilter = false
      this.setState({filter: this.newFilter}, () => null)
    }
  }

  clearCompleted = () => {
    this.newFilter.isFilter = false
    this.setState({filte: this.newFilter}, () => null)
    this.newTodos = this.newTodos.filter(todo => !todo.completed)
    this.setState({filte: {
      isFilter: false
    }})
    this.setState({todos: this.newTodos},() => this.setLocal('todos',this.newTodos))
  }

  submitEdit = (value, index) => {
    this.newTodos[index].title = value
    this.setState({todos: this.newTodos}, () => this.setLocal('todos',this.newTodos))
  }

  render() {
    return (
      <div className="app">
        <h3>todos</h3>
        <div className="app-contain">
          <Add 
            addTodo={this.addTodo}
            toggleAll={this.toggleAll}
          />
          <List 
            todos={this.state.filter.isFilter ? this.state.filter.filterValue : this.state.todos} 
            toggleComplete={this.toggleComplete} 
            deleteTodo={this.deleteTodo}
            submitEdit={this.submitEdit}
          />
          <Filter 
            todos={this.state.todos}
            checkFilter={this.checkFilter}
            clearCompleted={this.clearCompleted}
          />
        </div>
      </div>
    )
  }

}
export default App;
