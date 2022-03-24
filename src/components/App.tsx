import { useState } from 'react'

import { CompletedTodoList } from './CompletedTodoList'
import { TodoList } from './TodoList'
import { TodoType } from './Todo'

import '../styles/styles.css'

// Define this as an array of TodoType
const initialTodos: TodoType[] = [];

export const App = () => {
  // Initialise this with a correctly defined initialTodos
  const [todos, setTodos] = useState(initialTodos);
  
  const [todoInput, setTodoInput] = useState('')
  const [showCompletedTodos, setShowCompletedTodos] = useState(true)

  //Declare the type of the parameter
  //Declare the type this function returns, too 
  const addTodo = (text: string): void  => {
    if (todos.some(todo => todo.text.toLowerCase() === text.toLowerCase())) {
      alert('That todo already exists!')
      return
    }
    setTodos([...todos, { text, completed: false }])
  }

  //Declare the type of the parameter
  //Declare the type this function returns, too 
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>): void => setTodoInput(e.target.value)

  //Declare the type of the parameter
  //Declare the type this function returns, too 
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    addTodo(todoInput)
    setTodoInput('')
  }

  //Declare the type of the parameter
  //Declare the type this function returns, too 
  const toggleTodoCompletion = (target: TodoType): void => {
    const updatedTodos = todos.map(todo =>
      todo === target ? { ...todo, completed: !todo.completed } : todo
    )
    setTodos(updatedTodos)
  }

  //Declare the type of the parameter
  //Declare the type this function returns, too 
  const removeTodo = (target:TodoType): void => {
    setTodos(todos.filter(todo => todo !== target))
  }

  const incompleteTodos = todos.filter(todo => !todo.completed)
  const completedTodos = todos.filter(todo => todo.completed)

  return (
    <div className="App">
      <main>
        <section>
          <h2 className="title">OPTIONS</h2>
          <label>
            Show completed
            <input
              className="show-completed"
              onChange={e => setShowCompletedTodos(e.target.checked)}
              type="checkbox"
              checked={showCompletedTodos}
            />
          </label>
        </section>
        <section>
          <h2 className="title">ADD ITEM</h2>
          <form className="add-item" onSubmit={handleSubmit}>
            <input
              className="text-input"
              type="text"
              name="text"
              required
              minLength={3}
              onChange={handleChange}
              value={todoInput}
            />
            <button type="submit">Add</button>
          </form>
        </section>
        <TodoList
          incompleteTodos={incompleteTodos}
          toggleTodoCompletion={toggleTodoCompletion}
          removeTodo={removeTodo}
        />
        {showCompletedTodos ? (
          <CompletedTodoList
            completedTodos={completedTodos}
            toggleTodoCompletion={toggleTodoCompletion}
            removeTodo={removeTodo}
          />
        ) : null}
      </main>
    </div>
  )
}
