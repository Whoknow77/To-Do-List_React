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

const List = (props) => {
  return (
    <ul className="todolist">
      {props.todo.map((todoItem) => (
        <TodoItem
          todoItem={todoItem}
          key={todoItem.id}
          text={todoItem.content}
          id={todoItem.id}
          deleteTodo={props.deleteTodo}
          selectTodo={props.selectTodo}
        />
      ))}
    </ul>
  );
};

const TodoItem = (props) => {
  return (
    <li className="todo__item">
      <div className="checkbox"></div>
      <div className="todotext">{props.text}</div>
      <button className="editBtn">Edit</button>
      <button className="delBtn" onClick={() => props.deleteTodo(props.id)}>
        X
      </button>
    </li>
  );
};

const Button = (props) => {
  return (
    <section className="all">
      <button className="btn__all btn__all__delete" onClick={props.AllDelete}>
        {props.delete}
      </button>
      <button className="btn__all btn__all__select">{props.select}</button>
    </section>
  );
};

const App = () => {
  // todo 배열
  const [todo, setTodo] = React.useState(
    jsonLocalStorage.getItem("todolist") || []
  );
  const [id, setId] = React.useState(
    jsonLocalStorage.getItem("todolist")
      ? jsonLocalStorage.getItem("todolist")[
          jsonLocalStorage.getItem("todolist").length - 1
        ].id
      : 0
  );

  function updateTodo(text) {
    const nextId = id + 1;
    const newTodo = {
      id: nextId,
      content: text,
      isSelected: false,
    };

    const currentTodo = [...todo, newTodo];
    setTodo(currentTodo);
    setId(nextId);
    jsonLocalStorage.setItem("todolist", currentTodo);
  }

  function deleteTodo(id) {
    const currentTodo = [];
    for (let i = 0; i < todo.length; i++) {
      if (todo[i].id !== id) {
        currentTodo.push(todo[i]);
      }
    }
    setTodo(currentTodo);
    jsonLocalStorage.setItem("todolist", currentTodo);
  }

  // 전체 삭제
  function AllDelete() {
    setTodo([]);
    localStorage.clear();
  }

  return (
    <div className="wrapper">
      <Title text="To Do List"></Title>
      <Input updateTodo={updateTodo} />
      <List todo={todo} deleteTodo={deleteTodo}></List>
      <Button delete="전체 삭제" select="전체 선택" AllDelete={AllDelete} />
    </div>
  );
};

export default App;
