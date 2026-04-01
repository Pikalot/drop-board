import { useDroppable } from '@dnd-kit/core'
import TaskCard from './TaskCard'
import './Board.css'

function Column({
  id,
  title,
  tasks,
  onDelete,
  onEdit,
  onAddTask,
  activeMenu,
  setActiveMenu
}) {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      className={`task-column ${isOver ? 'is-over' : ''}`}
    >
      <h3 className="column-title">{title} ({tasks.length})</h3>

      {tasks.length === 0 ? (
        <div style={{
          textAlign: 'center',
          marginTop: '40px',
          color: '#bbb',
          fontSize: '13px',
          userSelect: 'none',
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>·····</div>
          <p style={{ margin: 0 }}>No tasks here</p>
          <p style={{ margin: '4px 0 8px', fontSize: '11px' }}>Drop a task here</p>
        </div>
      ) : (
        tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
            onEdit={onEdit}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
        ))
      )}

      <button
        onClick={() => onAddTask(id)}
        style={{
          marginTop: 'auto',
          padding: '8px',
          background: 'none',
          border: '1px dashed #ccc',
          borderRadius: '6px',
          cursor: 'pointer',
          color: '#999',
          fontSize: '13px',
          width: '100%',
        }}
      >
        + Add task
      </button>
    </div>
  )
}

export default Column