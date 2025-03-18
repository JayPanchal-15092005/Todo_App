import React, { useState } from "react";
import { useTodo } from "../contexts";

function TodoForm() {
  const [todo, setTodo] = useState("");

  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();

    if (!todo) return;

    addTodo({ todo, completed: false });
    setTodo("");
  };

  return (
    <form
      onSubmit={add}
      className="flex w-full max-w-md mx-auto gap-2 bg-white/10 p-2 rounded-lg shadow-lg"
    >
      <input
        type="text"
        placeholder="Write your todo..."
        className="flex-1 px-4 py-2 rounded-lg outline-none bg-white/20 text-white placeholder-gray-300 border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition-all"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-500 hover:scale-105 transition-all duration-200"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;

