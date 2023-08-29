import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useNavigate, useParams } from "react-router-dom";

export default function TaskForm() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [task, setTask] = useState({
    id: null,
    title: "",
    description: "",
    due_date: "",
    status: "To Do",
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false); // New state for submitting status

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient
        .get(`/tasks/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setTask(data.data);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const onSubmit = (ev) => {
    ev.preventDefault();

    if (submitting) {
      return; // Prevent multiple submissions
    }

    setSubmitting(true);

    const updatedTask = { ...task };

    const axiosRequest = task.id
      ? axiosClient.put(`/tasks/${task.id}`, updatedTask)
      : axiosClient.post("/tasks", updatedTask);

    axiosRequest
      .then(() => {
        navigate("/tasks");
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      })
      .finally(() => {
        setSubmitting(false); // Reset submitting status
      });
  };

  return (
    <div>
      <h1>{id ? "Edit Task" : "Create Task"}</h1>
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Loading...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <input
              value={task.title}
              onChange={(ev) => setTask({ ...task, title: ev.target.value })}
              placeholder="Title"
            />
            <textarea
              value={task.description}
              onChange={(ev) =>
                setTask({ ...task, description: ev.target.value })
              }
              placeholder="Description"
            />
            <input
              type="date"
              value={task.due_date}
              onChange={(ev) =>
                setTask({ ...task, due_date: ev.target.value })
              }
            />
            <select
              value={task.status}
              onChange={(ev) => setTask({ ...task, status: ev.target.value })}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button className="btn" disabled={submitting}>
              {submitting ? "Submitting..." : id ? "Update" : "Create"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
