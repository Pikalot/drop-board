import './Modal.css'

const PRIORITY_COLORS = {
  high: 'rgb(161, 43, 43);',
  normal: 'rgb(13, 107, 13)',
  low: 'rgb(79, 78, 78)',
}

const STATUS_LABELS = {
  todo: 'To Do',
  in_progress: 'In Progress',
  in_review: 'In Review',
  done: 'Done',
}

function TaskDetailModal({ task, onClose, onEdit, onDelete }) {
  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content' onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className='detail-header'>
          <span
            className={`priority-badge priority-${task.priority}`}
            style={{ background: PRIORITY_COLORS[task.priority] }}
          >
            {task.priority}
          </span>
          <button onClick={onClose} className='detail-close-button'>✕</button>
        </div>

        {/* Title */}
        <h2 className='detail-title'>{task.title}</h2>

        {/* Description */}
        <div className='detail-section'>
          <p className='detail-label'>Description</p>
          <p className='detail-value'>
            {task.description || 'No description provided'}
          </p>
        </div>

        {/* Status */}
        <div className='detail-section'>
          <p className='detail-label'>Status</p>
          <p className='detail-value'>{STATUS_LABELS[task.status]}</p>
        </div>

        {/* Footer buttons */}
        <div className='modal-footer'>
          <button
            onClick={() => { onDelete(task.id); onClose() }}
            className='delete-button'
          >
            🗑️ Delete
          </button>
          <button onClick={() => { onEdit(task); onClose() }} className='submit-button'>
            ✏️ Edit
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailModal