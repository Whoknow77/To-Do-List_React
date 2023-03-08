import React from "react";
import "./App.css";

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

const Title = ({ text }) => {
  return <h1 className="title">{text}</h1>;
};

const Button = (props) => {
  return (
    <section className="all">
      <button className="btn__all btn__all__delete">{props.delete}</button>
      <button className="btn__all btn__all__select">{props.select}</button>
    </section>
  );
};

const Input = ({ updateTodo }) => {
  const [text, setText] = React.useState("");

  function handleSubmit(e) {
    setText(e.target.value);
  }
  return (
    <section className="write__box">
      <input
        type="text"
        className="todo__input"
        placeholder="할 일 추가하기"
        value={text}
        onChange={handleSubmit}
      />
      <button className="btn__add" onClick={() => updateTodo(text)}>
        <i className="fa-solid fa-plus icon__add"></i>
      </button>
    </section>
  );
};

const List = ({ todo }) => {
  return (
    <ul className="todolist">
      {todo.map((todoItem) => (
        <TodoItem todoItem={todoItem.content} key={todoItem.id} />
      ))}
    </ul>
  );
};

const TodoItem = ({ todoItem }) => {
  return (
    <li className="todo__item">
      <div className="checkbox"></div>
      <div className="todotext">{todoItem}</div>
      <button className="editBtn">Edit</button>
      <button className="delBtn">X</button>
    </li>
  );
};

const App = () => {
  // todo 배열
  const [todo, setTodo] = React.useState(() => {
    return jsonLocalStorage.getItem("todolist") || [];
  });

  function updateTodo(text) {
    const newTodo = {
      id: todo.length + 1,
      content: text,
      isSelected: false,
    };
    const currentTodo = [...todo, newTodo];
    setTodo(currentTodo);
    jsonLocalStorage.setItem("todolist", currentTodo);
  }

  return (
    <div className="wrapper">
      <Title text="To Do List"></Title>
      <Input updateTodo={updateTodo} />
      <List todo={todo}></List>
      <Button delete="전체 삭제" select="전체 선택" />
    </div>
  );
};

export default App;
