import { useState, useEffect } from "react";
import styles from "./TodoList.module.css";
import Clock from "../Clock/Clock";
import Weather from "../weather/weather";

function TodoApp() {
  // localStorage에서 초기값 불러오기
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("ALL");

  // todos가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const AddTodo = (e) => {
    e.preventDefault();
    if (inputValue) {
      setTodos([
        ...todos,
        { id: Date.now(), text: inputValue, completed: false },
      ]);
    }
    setInputValue("");
  };

  const ToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 삭제 함수 수정
  const DeleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const FilteredTodos = todos.filter((todo) => {
    if (filter === "COMPLETED") return todo.completed;
    if (filter === "ACTIVE") return !todo.completed;
    return true;
  });

  return (
    <>
      <div className={styles.todoApp}>
        <Clock />
        <Weather />
        <h1 className={styles.title}>TODO LIST</h1>
        <header className={styles.header}>
          <form onSubmit={AddTodo}>
            <input
              type="text"
              placeholder="Write to do"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className={styles.input}
            />
          </form>
          <button onClick={AddTodo} className={styles.submitButton}>
            +
          </button>
        </header>
        <ul className={styles.todoList}>
          {FilteredTodos.map((todo) => (
            <li key={todo.id} className={styles.todoItem}>
              <span
                className={`${styles.todoText} ${
                  todo.completed ? styles.completed : ""
                }`}
              >
                {todo.text}
              </span>
              <div className={styles.buttonGroup}>
                <button
                  className={styles.checkButton}
                  onClick={() => ToggleTodo(todo.id)}
                >
                  {todo.completed ? "✔" : "✓"}
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => DeleteTodo(todo.id)}
                >
                  🗑
                </button>
              </div>
            </li>
          ))}
          <div className={styles.filterButtons}>
            <button
              onClick={() => setFilter("ALL")}
              className={`${styles.filterButton} ${
                filter === "ALL" ? styles.active : ""
              }`}
            >
              {" "}
              ALL{" "}
            </button>
            <button
              onClick={() => setFilter("COMPLETED")}
              className={`${styles.filterButton} ${
                filter === "COMPLETED" ? styles.active : ""
              }`}
            >
              {" "}
              COMPLETED{" "}
            </button>
            <button
              onClick={() => setFilter("ACTIVE")}
              className={`${styles.filterButton} ${
                filter === "ACTIVE" ? styles.active : ""
              }`}
            >
              {" "}
              ACTIVE{" "}
            </button>
          </div>
        </ul>
      </div>
      <div className={styles.numberOfTodo}> {todos.length} items left</div>
    </>
  );
}

function TodoList() {
  return <TodoApp />;
}

export default TodoList;
