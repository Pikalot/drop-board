import { useState } from 'react'
import './Modal.css'

const STATUS_LABELS = {
  todo: 'To Do',
  in_progress: 'In Progress',
  in_review: 'In Review',
  done: 'Done',
}

function NewTaskModal({ onClose, onSubmit, defaultStatus = 'todo', editTask = null }) {
  const [title, setTitle] = useState(editTask?.title || '')
  const [priority, setPriority] = useState(editTask?.priority || 'normal')
  const [status, setStatus] = useState(editTask?.status || defaultStatus)
  const isEditing = editTask !== null

  function handleSubmit() {
    if (!title.trim()) return alert('Please enter a task title')
    onSubmit({ title, priority, status })
    onClose()
  }

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h2 style={{ margin: 0 }}>{isEditing ? 'Edit Task' : 'New Task'}</h2>

        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          autoFocus
        />

        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
        >
          <option value="low">Low Priority</option>
          <option value="normal">Normal Priority</option>
          <option value="high">High Priority</option>
        </select>

        <div className='modal-footer'>
          <button onClick={onClose} className='white-button'>
            Cancel
          </button>
          <button onClick={handleSubmit} className='submit-button'>
            {isEditing ? 'Save Changes' : 'Create Task'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewTaskModal