import { useState, useEffect } from "react";
import { TodoProvider } from "./contexts/index.js";
import TodoForm from "./components/TodoForm.jsx";
import TodoItem from "./components/TodoItem.jsx";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)));
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-gradient-to-b from-blue-900 to-gray-900 min-h-screen py-8 flex items-center justify-center">
        <div className="w-full max-w-2xl mx-auto shadow-lg rounded-lg p-6 bg-gray-800 text-white">
          <h1 className="text-3xl font-bold text-center mb-6 animate-fade-in">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="space-y-3">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <Analytics />
      </div>
    </TodoProvider>
  );
}

export default App;
