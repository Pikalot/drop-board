import { useDraggable } from '@dnd-kit/core'

function TaskCard({ task, onDelete, onEdit, activeMenu, setActiveMenu }) {
  const isOpen = activeMenu === task.id

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  })

  const style = transform ? {
    transform: `translate(${transform.x}px, ${transform.y}px)`,
  } : {}

  return (
    <div
      ref={setNodeRef}
      style={{
        background: 'white',
        borderRadius: '6px',
        padding: '10px',
        marginBottom: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        position: 'relative',
        ...style,
      }}
    >
      <div
        {...listeners}
        {...attributes}
        style={{ cursor: 'grab', marginBottom: '4px' }}
      >
        {task.title}
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation()
          setActiveMenu(isOpen ? null : task.id)
        }}
        style={{
          position: 'absolute',
          top: '6px',
          right: '6px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px',
          color: '#999',
          lineHeight: 1,
          padding: '2px 6px',
          borderRadius: '4px',
        }}
      >
        ···
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '28px',
          right: '6px',
          background: 'white',
          border: '1px solid #eee',
          borderRadius: '6px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          zIndex: 100,
          minWidth: '120px',
          overflow: 'hidden',
        }}>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setActiveMenu(null)
              onEdit(task)
            }}
            style={{
              display: 'block',
              width: '100%',
              padding: '8px 12px',
              background: 'none',
              border: 'none',
              borderBottom: '1px solid #eee',
              cursor: 'pointer',
              textAlign: 'left',
              color: '#333',
              fontSize: '14px',
            }}
          >
            ✏️ Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setActiveMenu(null)
              onDelete(task.id)
            }}
            style={{
              display: 'block',
              width: '100%',
              padding: '8px 12px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              color: '#e11d48',
              fontSize: '14px',
            }}
          >
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default TaskCard