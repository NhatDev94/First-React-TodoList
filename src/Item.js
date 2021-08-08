import React from "react";

class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false
    }
  }

  handelEdit = () => {
    !this.props.todo.completed && this.setState({isEdit: true}, () => null)
  }

  submitEdit = (event, index) => {
    this.props.submitEdit(event.target.value, index)
    this.setState({isEdit: false}, () => null)
  }

  render() {
    let completed = this.props.todo.completed ? 'completed' : ''
    let hide = this.state.isEdit ? 'hide' : ''
    let props = this.props
    return (
      <div className="item">
        <input 
          type="checkbox" 
          readOnly
          checked={props.todo.completed ? 'checked' : ''}
          onClick={() => this.props.toggleComplete(this.props.index)}
        />
        <p 
          className={completed + ' ' + hide} 
          onDoubleClick={() => this.handelEdit()}
        >{this.props.todo.title}</p>

        <input 
          className={!this.state.isEdit ? 'hide' : 'edit'} 
          type="text" 
          defaultValue={this.props.todo.title}
          onKeyUp={(event) => event.keyCode === 13 || event.keyCode === 27 ? this.submitEdit(event, this.props.index) : null}
          onBlur={(event) => this.submitEdit(event, this.props.index)}
        />
        <i 
          className="fas fa-trash"
          onClick={() => this.props.deleteTodo(this.props.index)}
        ></i>
      </div>
    )
  }

  componentDidUpdate() {
    let demo = document.querySelector('.edit')
    demo && demo.focus()
  }
}

export default Item;
