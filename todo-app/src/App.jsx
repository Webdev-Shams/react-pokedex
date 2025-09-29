import { Header } from "./components/Header"
import { Tabs } from "./components/Tabs"
import { TodoInput } from "./components/TodoInput"
import { TodoList } from "./components/TodoList"
import './index.css'
import { useState, useEffect } from "react"

function App() {

  const [todos, setTodos] =useState ([
     { input: 'Hello! Add your first todo!', complete: true }
  ])
  const [selectTab, setSelectTab] = useState ('Open')
  

  // function handleAdd (newTodo) {
  //   const newTodoList = [...todos, {input: newTodo, complete: false}]
  //   setTodos (newTodoList) 
  // }
  
  function handleAdd (newTodo) {
    const newTodoList = [...todos, { input: newTodo, complete: false }]
    setTodos(newTodoList)
      handleSaveData (newTodoList)
  }

//   function handleDoneTodo(index) {
//     let newTodoList = [...todos]
//     let completedTodo = todos[index]
//     completedTodo['complete'] = true
//     newTodoList[index] = completedTodo
//     setTodos(newTodoList)
//   }

  //   function handleDeleteTodo(index) {
  //     const newTodoList = todos.filter((val, valIndex) => {
  //       return valIndex !== index
  //     })
  //     setTodos(newTodoList)
  // }

  function handleDoneTodo(index) {
  const  newTodoList = todos.map((todo, i) =>
      i === index ? { ...todo, complete: true } : todo)
  setTodos(newTodoList)
    handleSaveData (newTodoList)
}

  function handleDeleteTodo(index) {
  const newTodoList = todos.filter((_, i) => i !== index)
  setTodos(newTodoList)
    handleSaveData (newTodoList)
}

  function handleSaveData (current) {
    localStorage.setItem('todo-app', JSON.stringify({todos: current}))
  }

  useEffect(() => {
    if (!localStorage || !localStorage.getItem('todo-app')) {return}
    let db = JSON.parse(localStorage.getItem('todo-app'))
    setTodos(db.todos)
  }, [])


  return (
    <>
      <Header todos={todos}/>
      <Tabs selectTab={selectTab} setSelectTab={setSelectTab} todos={todos}/>
      <TodoList handleDeleteTodo={handleDeleteTodo} handleDoneTodo={handleDoneTodo} selectTab={selectTab} todos={todos}/>
      <TodoInput handleAdd={handleAdd}/>
    </>
  )
}

export default App
