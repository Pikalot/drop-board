import { useState } from 'react'

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
    <div style={{
      position: 'fixed', top: 0, left: 0,
      width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white', borderRadius: '8px',
        padding: '24px', width: '400px',
        display: 'flex', flexDirection: 'column', gap: '12px'
      }}>
        <h2 style={{ margin: 0 }}>{isEditing ? 'Edit Task' : 'New Task'}</h2>

        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          autoFocus
          style={{
            padding: '8px', borderRadius: '6px',
            border: '1px solid #ccc', fontSize: '14px'
          }}
        />

        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          style={{
            padding: '8px', borderRadius: '6px',
            border: '1px solid #ccc', fontSize: '14px'
          }}
        >
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
          style={{
            padding: '8px', borderRadius: '6px',
            border: '1px solid #ccc', fontSize: '14px'
          }}
        >
          <option value="low">Low Priority</option>
          <option value="normal">Normal Priority</option>
          <option value="high">High Priority</option>
        </select>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{
            padding: '8px 16px', borderRadius: '6px',
            border: '1px solid #ccc', cursor: 'pointer',
            background: 'white'
          }}>
            Cancel
          </button>
          <button onClick={handleSubmit} style={{
            padding: '8px 16px', borderRadius: '6px',
            border: 'none', cursor: 'pointer',
            background: '#4f46e5', color: 'white'
          }}>
            {isEditing ? 'Save Changes' : 'Create Task'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewTaskModal