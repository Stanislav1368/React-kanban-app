import React from 'react'
import Task from './Task';

const TaskList = ({ status, tasks, handleDelete, statuses, handleStatusChange }) => {
    
    return (
        <div style={{marginLeft: '12px', marginRight: '12px'}} className='col border border-secondary rounded-2 '>   
            <div className='row mt-4 mb-5 p-2'>
                <h3>{status}</h3>
                {tasks.filter((task)=>task.status===status) .map(task => (
                <Task key={task.id} statuses={statuses} task={task} handleDelete={handleDelete} onStatusChange={handleStatusChange} />
                ))}
            </div>
        </div>
    );
  }

export default TaskList