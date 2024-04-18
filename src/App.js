import "./styles.css";
import React from "react";

export default function App() {
  // ["wash the dishes", function(newValue) { ... } ]
  const [todoText, setTodoText] = React.useState("wash the dishes");
  const [todos, setTodos] = React.useState(["do the laundry", "walk the dog"]);
  const [editing, setEditing] = React.useState({
    0: false,
    1: false,
  });
  const [editingText, setEditingText] = React.useState({
    0: "",
    1: "",
  });

  function onAddClick(event) {
    if (todoText.trim().length === 0) {
      return;
    }

    setTodos([...todos, todoText]);
    setTodoText("");
  }

  function onTodoTextChange(event) {
    setTodoText(event.target.value);
  }

  function onRemoveClick(indexToRemove) {
    return (event) => {
      const filteredTodos = todos.filter((todo, todoIndex) => {
        return todoIndex !== indexToRemove;
      });

      setTodos(filteredTodos);
    };
  }

  function onEditClick(event) {
    console.log(event.target.dataset.index); // data-index -> dataset.index
    const index = event.target.dataset.index;
    setEditingText({
      ...editingText,
      [index]: todos[index],
    });
    setEditing({
      ...editing,
      [index]: true,
    });
  }

  function onSaveClick(index) {
    return (event) => {
      setTodos(
        todos.map((todo, todoIndex) => {
          if (todoIndex === index) {
            return editingText[index];
          }

          return todo;
        })
      );
      setEditing({
        ...editing,
        [index]: false,
      });
    };
  }

  function onEditingTextChange(index) {
    return (event) => {
      setEditingText({
        ...editingText,
        [index]: event.target.value,
      });
    };
  }

  return (
    <div>
      <div className="todo-input-container">
        <input
          type="text"
          className="todo-input"
          value={todoText}
          onChange={onTodoTextChange}
        />
        <button type="button" className="add-button" onClick={onAddClick}>
          Add
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li>
            <button type="button" onClick={onEditClick} data-index={index}>
              Edit
            </button>
            <button
              type="button"
              className="remove-button"
              onClick={onRemoveClick(index)}
            >
              Remove
            </button>
            {editing[index] ? (
              <React.Fragment>
                <input
                  type="text"
                  value={editingText[index]}
                  onChange={onEditingTextChange(index)}
                />
                <button type="button" onClick={onSaveClick(index)}>
                  Save
                </button>
              </React.Fragment>
            ) : (
              <span>{todo}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
