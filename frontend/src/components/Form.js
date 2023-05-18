import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';

const Form = ({ formData, handleChange, handleSubmit, responserList }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <button className='navbar-toggler bg-light' aria-label="Toggle navigation" type="button" onClick={handleShowModal}>
        <span class="text-dark">Добавить задачу</span>
      </button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить задачу</Modal.Title>
        </Modal.Header> 

        <Modal.Body>
          <form style={{}} className='border border-secondary rounded-2 mt-2 p-2' onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className='form-label'>
                Заголовок:
                <input className='form-control' type="text" name="title" value={formData.title} onChange={handleChange} required />
              </label>
            </div>
            <div className="mb-3">
              <label className='form-label'>
                Описание:
              </label>
              <textarea className='form-control' name="description" value={formData.description} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className='form-label'>
                Ответственный:
                <select className='form-select' name="responser" value={formData.responser} onChange={handleChange} required>
                    <option value="" disabled selected>Выберите сотрудника</option>
                    {responserList.map((resp) => (
                        <option key={resp} value={resp}>{resp}</option>
                    ))}
                </select>
              </label>
            </div>

            <button className='btn btn-primary' type="submit">Добавить задачу</button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Form
