import React from "react";

class Filter extends React.Component {

  checkFilter = (filter,target) => {
    this.props.checkFilter(filter)
    let nodes = document.querySelectorAll('.filter')
    nodes = [...nodes]
    nodes.map(item => item.classList.remove('filter-active'))
    target.classList.add('filter-active')
  }

  render() {
    var count = 0
    var className = this.props.todos.length === 0 ? 'hide' : ''
    this.props.todos.map(todo => !todo.completed && count++)
    return (
      <div className={className + ' filter-wrap'}>
        <p className="count">{count} item left</p>
        <div className="filter-content">
          <p 
            className="filter filter-active"
            onClick={(event) => this.checkFilter('all', event.target)}
          >All</p>
          <p 
            className="filter"
            onClick={(event) => this.checkFilter('active', event.target)}
          >Active</p>
          <p 
            className="filter"
            onClick={(event) => this.checkFilter('completed', event.target)}
          >Complete</p>
        </div>
        <p className="clear-completed" onClick={() => this.props.clearCompleted()}>Clear complete</p>
      </div>
    )
  }
}

export default Filter;
