import React from "react";

class Add extends React.Component {

  addTodo = (event) => {
    event.target.value.trim() && this.props.addTodo(event.target.value)
    event.target.value = ''
  }

  toggleAll = () => {
    this.props.toggleAll()
  }

  render() {
    return (
      <div className="add">
          <i 
            className="fas fa-chevron-down"
            onClick={() => this.toggleAll()}
          ></i>
          <input 
            type="text" 
            placeholder="Add todo..." 
            onKeyUp={ (event) => event.keyCode === 13 && this.addTodo(event)}
          />
      </div>
    )
  }
}

export default Add;
