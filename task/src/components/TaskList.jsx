import { useState, useEffect } from "react";

export default function TaskList() {
  const initialTask = {
    title: "",
    dueDate: "",
    category: "",
  };

  const [task, setTask] = useState(initialTask);
  const [tasksList, setTasksList] = useState([]);

  
  useEffect(() => {
    const savedTask = JSON.parse(localStorage.getItem("task"));
    if (savedTask) {
      setTask(savedTask);
    }

    const savedTasksList = JSON.parse(localStorage.getItem("tasksList"));
    if (savedTasksList) {
      setTasksList(savedTasksList);
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(task));
  }, [task]);

  useEffect(() => {
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
  }, [tasksList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    setTasksList([...tasksList, task]);
    setTask(initialTask);
  };

  const handleDelete = (hey) => {
    const filteredItem = tasksList.filter((fil) => fil.title !== hey)

    setTasksList(filteredItem)

    localStorage.setItem('tasksList', JSON.stringify(filteredItem))
    console.log(filteredItem)
  }

  return (
    <div>

<a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.herokuapp.com/?lines=Hello,+There!+👋;I+am+Tsion+Molla....;Nice+to+meet+you!&center=true&size=30"/>
  </a>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          name="title"
          type="text"
          value={task.title}
          onChange={handleChange}
        />
        <label>Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
        />
        <label>Category</label>
        <input
          onChange={handleChange}
          name="category"
          value={task.category}
          type="text"
        />
        <select>
  <option   value={task.category}
            name="category"
            onChange={handleChange}>work</option>
  <option   value={task.category}
            onChange={handleChange}
            name="category">Option 2</option>
  <option   value={task.category}
             onChange={handleChange}
             name="category">Option 3</option>

        </select>
        <input type="submit" value="Add Task" />
      </form>

      <div>
        <h2>Tasks List</h2>
        <ul>
          {tasksList.map((task, index) => (
            <div key={index}>
              <strong>Title:</strong> {task.title}, <strong>Due Date:</strong>{" "}
              {task.dueDate}, <strong>Category:</strong> {task.category}
              <button onClick={() => handleDelete(task.title)}>delete</button>
            </div>
           
          ))}
        </ul>
      </div>
    </div>
  );
}
