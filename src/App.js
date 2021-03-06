import { StrictMode, useState } from 'react'
import ReactDOM from 'react-dom'
import TaskCard from './TaskCard'
import taskData from './task-data.json'
import './styles.css'
import FilterInput from './FilterInput'
import AddTaskInput from './AddTaskInput'

function App() {
  const [tasks, setTasks] = useState(taskData)
  const [count, setCount] = useState(0)

  const updateCountHandler = (incOrDec) => {
    incOrDec === 'increment'
      ? setCount((prevCount) => prevCount + 1)
      : setCount((prevCount) => prevCount - 1)
  }

  const deleteTodoHandler = (todoId) => {
    setTasks((prevTasks) => prevTasks.filter((el) => el.id !== todoId))
  }

  const addTaskHandler = (newTask) => {
    const lastId = tasks[tasks.length - 1].id
    const newerTask = { id: lastId + 1, name: newTask }
    setTasks((prevTasks) => [...prevTasks, newerTask])
  }

  const filterTaskHandler = (query) => {
    console.log(query)
    if (query === '') {
      setTasks(taskData)
    } else {
      const filtered = tasks.filter((task) =>
        task.name.toLowerCase().includes(query.toLowerCase())
      )
      setTasks(filtered)
    }
  }

  return (
    <div className="layout">
      <div className="frame">
        <div className="frame-header">
          <h1>Tasks</h1>
          <span className="completed-count-text">{count} completed</span>
        </div>
        <FilterInput filterTaskHandler={filterTaskHandler} />
        <div className="frame-body">
          {tasks.map((entry, idx) => (
            <TaskCard
              key={idx}
              name={entry.name}
              id={entry.id}
              isFirstCard={idx === 0}
              updateCountHandler={updateCountHandler}
              deleteTodoHandler={deleteTodoHandler}
            ></TaskCard>
          ))}
          <AddTaskInput addTaskHandler={addTaskHandler} />
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
)
