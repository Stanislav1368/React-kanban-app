import React, { useState } from 'react'

const Task = ( props ) => {
    const [status, setStatus] = useState(props.task.status);

    const handleChangeStatus = (event) => {
        // обновление статуса задачи через useState
        setStatus(event.target.value);
        // вызов функции для изменения статуса на сервере
        props.onStatusChange(props.task.id, event.target.value);
    };

    const getRandomColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
      };
      const style = {
        "borderColor": getRandomColor(),
        borderWidth: '3px'
      }; 
    
    return (
        <div style={style} className='card mt-4 mb-4 rounded-4'>
            <div className='card-body'>
                <h5 className='card-title d-inline'>{props.task.title}</h5>
                <p>{props.task.description}</p>
                <p className='text-decoration-underline'>{props.task.responser}</p>
                <button style={{float: 'right'}} className='rounded-3 border-danger ms-5'  onClick={() => props.handleDelete(props.task.id)}>❌</button>   
             </div>
            <div className='ms-3 me-3 mb-2'>
                <select className='form-select' aria-label='Default select example' value={status} onChange={handleChangeStatus}>
                    {props.statuses.map((status) => (
                        <option key={status} value={status}>{status}</option>
                    ))}         
                </select>
            </div>
        </div>
    );
};

export default Task
