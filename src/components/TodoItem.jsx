import React, { useState } from "react";
import { useTodo } from "../contexts";
import { motion } from "framer-motion";

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center border border-gray-300 rounded-lg px-4 py-2 gap-x-3 shadow-md duration-300 transition-all transform hover:scale-[1.02] w-full max-w-lg
      ${todo.completed ? "bg-green-200" : "bg-purple-200"}`}
    >
      <input
        type="checkbox"
        className="cursor-pointer w-5 h-5 accent-green-600"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`border-none outline-none w-full bg-transparent rounded-lg text-lg transition-all duration-200 ${
          isTodoEditable ? "px-2 bg-white shadow-inner" : ""
        } ${todo.completed ? "line-through text-gray-500" : "text-black"}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      {/* // Edit and Save Buttons  */}
      <button
        className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 shadow-md disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return;
          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "💾" : "✏️"}
      </button>
      {/* // Delete Todo Buttons  */}
      <button
        className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-200 shadow-md"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </motion.div>
  );
}

export default TodoItem;
