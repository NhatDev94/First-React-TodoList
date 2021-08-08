import React from "react";
import Item from "./Item";

class List extends React.Component {
  render() {
    let className = this.props.todos.length === 0 && 'hide'
    return (
      <div className={className + " list" }>
        {
          this.props.todos.length > 0 && this.props.todos.map((todo, index) =>
            <Item 
              todo={todo} 
              index={index} 
              toggleComplete={this.props.toggleComplete} 
              deleteTodo={this.props.deleteTodo}
              submitEdit={this.props.submitEdit}
              key={index} 
            />
          )
        }
      </div>
    )   
  }
}

export default List;
