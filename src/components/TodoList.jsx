import styles from "./TodoList.module.css";
import { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("ALL");

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

  const FilteredTodos = todos.filter((todo) => {
    if (filter === "COMPLETED") return todo.completed;
    if (filter === "ACTIVE") return !todo.completed;
    return true;
  });

  return (
    <>
      <div className={styles.todoApp}>
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
                  onClick={() =>
                    setTodos(todos.filter((t) => t.id !== todo.id))
                  }
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

export default TodoList;
