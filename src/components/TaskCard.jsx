import { useDraggable } from '@dnd-kit/core'
import './TaskCard.css'

function TaskCard({ task, onDelete, onEdit, activeMenu, setActiveMenu }) {
  const isOpen = activeMenu === task.id

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  })

  const style = transform ? {
    transform: `translate(${transform.x}px, ${transform.y}px)`,
  } : {}

  return (
  <div ref={setNodeRef} className='task-card' style={style}>
    
    {/* Top badge row */}
    <div className='task-card-badges'>
      <span className={`priority-badge priority-${task.priority}`}>
        {task.priority}
      </span>
    </div>

    {/* Title row */}
    <div {...listeners} {...attributes} className='task-card-title'>
      {task.title}
      {console.log(task.title + " " + task.priority)}
    </div>

    {/* Menu button */}
    <button
      onClick={(e) => {
        e.stopPropagation()
        setActiveMenu(isOpen ? null : task.id)
      }}
      className='task-card-menu-button'
    >
      ···
    </button>

    {/* Dropdown */}
    {isOpen && (
      <div className='task-card-dropdown'>
        <button onClick={(e) => { e.stopPropagation(); setActiveMenu(null); onEdit(task) }} className='task-card-edit-button'>
          ✏️ Edit
        </button>
        <button onClick={(e) => { e.stopPropagation(); setActiveMenu(null); onDelete(task.id) }} className='task-card-delete-button'>
          🗑️ Delete
        </button>
      </div>
    )}
  </div>
  )
}

export default TaskCard