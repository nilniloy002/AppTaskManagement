import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    getTasks();
  }, []);

  const onDeleteClick = (task) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }
    axiosClient.delete(`/tasks/${task.id}`).then(() => {
      getTasks();
    });
  };

  const getTasks = () => {
    setLoading(true);
    axiosClient
      .get("/tasks")
      .then(({ data }) => {
        setLoading(false);
        setTasks(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "To Do":
        return "blue";
      case "In Progress":
        return "orange";
      case "Completed":
        return "green";
      default:
        return "black"; // Default color
    }
  };

  const filteredTasks =
    selectedStatus === "All" ? tasks : tasks.filter((task) => task.status === selectedStatus);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Tasks</h1>
        <div style={{ display: "flex", alignItems: "initial",fontWeight:"bold" }}>
          <label htmlFor="statusFilter" style={{ marginRight: "10px" }}>
            Filter by status:
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <Link className="btn-add" to="/tasks/new">
          Add new
        </Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center">
                Loading...
              </td>
            </tr>
          ) : (
            filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.due_date}</td>
                <td style={{ color: getStatusColor(task.status) }}>
                  {task.status}
                </td>
                <td>
                  <Link className="btn-edit" to={"/tasks/" + task.id}>
                    Edit
                  </Link>
                  &nbsp;
                  <button className="btn-delete" onClick={(ev) => onDeleteClick(task)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
