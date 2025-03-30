import React, {Component} from "react"
import "./App.css";
import { isCursorAtEnd } from "@testing-library/user-event/dist/utils";
export default class App extends Component{

state = { 
  todoData :[
  ],
  value:""
};

  btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right"

  }
  getStyle = (completed) =>{
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    }
  }

  
handleClick = (id) => {
  let newTodoData = this.state.todoData.filter(data => data.id !== id);
  console.log('newTodoData', newTodoData);
  this.setState({ todoData: newTodoData});
};

haadleChange = (e) => { 
  console.log('e',e.target.value);
  this.setState( {value: e.target.value});
}

handleSubmit = (e) =>{
e.preventDefault();
//새로운 할일 데이터
let newTodo = {
  id: Date.now(),
  title: this.state.value,
  completed: false
};
  //원래 있던 할일에 새 할일 추가
  this.setState({todoData: [...this.state.todoData, newTodo], value: ""});
}

handleCompleteChange = (id) => {
  let newTodoData = this.state.todoData.map(data=> {
    if(data.id === id) {
      data.completed = !data.completed
    }
    return data;
  })

  this.setState({ todoData: newTodoData});
};
 
  render(){
    return(
      <div className="container">
        <div className="todoblock">
          <div className="title">
            <h1>할일 목록</h1>
          </div>
          
      {this.state.todoData.map((data) => (
        <div style={this.getStyle(data.completed)} key={data.id}>
          <input type="checkbox" defaultChecked={false} onChange={() => this.handleCompleteChange(data.id)} />
          {data.title}
          <button style={this.btnStyle} onClick={() => this.handleClick(data.id)}>X</button>
        </div>
      ))}

      <form style={{ display: "flex"}} onSubmit={this.handleSubmit}>
        <input type="text" 
        name="value" 
        style={{flex: "10", padding: "5px"}}
        placeholder="해야 할 일을 입력오."
        value={this.state.value}
        onChange={this.haadleChange}
        />
        <input
          type="submit"
          value="입력"
          className="btn"
          style={{flex: '1'}}/>
          </form>
          
      </div>
      </div>
    );
  }
}
