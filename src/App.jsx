import { useSelector, useDispatch } from "react-redux";
import { addTask, removeTask, toggleTask } from "./taskSlice";
import "./App.css";
import { useState } from "react";

function App() {
  const tasks = useSelector((state) => state.tasks); //extract data from the Redux store state
  //It takes the entire Redux store state as an argument and returns the tasks property from that state.
  //Whenever the tasks part of the state changes, the component will re-render with the new data
  const dispatch = useDispatch();
  //t returns a reference to the dispatch function from the Redux store.

  // create a form to add new tasks, a list to display the tasks, and buttons to remove and toggle the completion status of each task:
  //  // Local state for the new task input:
  const [newTask, setNewTask] = useState("");

  //checks if newTask is not an empty string after removing any leading and trailing whitespace using the trim() method.
  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch(addTask(newTask));
      setNewTask(""); // Clear the input
    }
  };
  return (
    <div>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>

      {/* List of tasks */}

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch(toggleTask(task.id))}
            />
            {task.title}
            <button onClick={() => dispatch(removeTask(task.id))}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
