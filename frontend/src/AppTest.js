import React, { useEffect, useState } from 'react'
import Form from './components/Form';
import TaskList from './components/TaskList';

const taskStatuses = ['Сделать', 'В процессе','Тестирование','Готово']
const responserList = ['Менеджер проекта','Frontend-разработчик','Backend-разработчик','Аналитик','Дизайнер','Директор по продажам','hr-специалист']

const AppTest = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "", status: "", responser: "" });

  useEffect(() => {
    fetch("/tasks")
      .then(response => response.json())
      .then(data => {
        setTasks(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onUpdate = () => {
    fetch("/tasks")
      .then(response => {
        if (!response.ok) throw new Error(response.statusText);
        return response;
      })
      .then(response => response.json())
      .then(tasks => {
        setTasks(tasks);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDelete = (taskId) => {
    fetch(`/tasks/${taskId}`, { method: "DELETE" })
      .then(response => {
        if (!response.ok) throw new Error(response.statusText);
        return response;
      })
      .then(() => {
        // обновляем список задач в компоненте-родителе
        onUpdate();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        setTasks([...tasks, data]);
        setFormData({ title: "", description: "", status: "", responser: "" });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleStatusChange = (taskId, newStatus) => {
    fetch(`/tasks/${taskId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        // обновление списка задач после успешного изменения статуса на сервере
        setTasks(
          tasks.map((task) => {
            if (task.id === taskId) {
              return { ...task, status: newStatus };
            }
            return task;
          })
        );
      });
  };

  return (
    <div>
      <nav class="navbar bg-dark">
        <form class="container-fluid justify-content-start">
          <div >
            <Form responserList={responserList} formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
          </div>
        </form>
      </nav>
      <div className='container-fluid'>
        

        <div className='row mt-4 mb-5'>
            {taskStatuses.map((status) => (
                <TaskList statuses={taskStatuses} responserList={responserList} status={status} tasks={tasks} handleDelete={handleDelete} handleStatusChange={handleStatusChange} />
            ))}
        </div>
      </div>
      

    </div>
  );
}

export default AppTest
