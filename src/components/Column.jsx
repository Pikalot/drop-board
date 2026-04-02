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
        <div className='empty-column'>
          <div className='separator-dots'>·····</div>
          <p>No tasks yet</p>
          <p className='button-text'>Drop a task here</p>
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
        className='gray-button button-text'
      >
        + Add task
      </button>
    </div>
  )
}

export default Column