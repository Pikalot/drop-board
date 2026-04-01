import { useState, useEffect } from 'react'
import { DndContext } from '@dnd-kit/core'
import { supabase } from '../supabaseClient'
import Column from './Column'
import NewTaskModal from './NewTaskModal'

const COLUMNS = ['todo', 'in_progress', 'in_review', 'done']

const COLUMN_LABELS = {
  todo: 'To Do',
  in_progress: 'In Progress',
  in_review: 'In Review',
  done: 'Done',
}

function Board() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [modalStatus, setModalStatus] = useState(null) // null = closed
  const [activeMenu, setActiveMenu] = useState(null)
  const [editingTask, setEditingTask] = useState(null)

  // Sign in as guest on load
  useEffect(() => {
    async function initAuth() {
      try {
        // Check if already signed in
        const { data: { session } } = await supabase.auth.getSession()

        if (session?.user) {
          setUser(session.user)
        } else {
          // Sign in anonymously
          const { data, error } = await supabase.auth.signInAnonymously()
          if (error) throw error
          setUser(data.user)
        }
      } catch (err) {
        setError('Failed to initialize session')
        console.error(err)
      }
    }

    initAuth()
  }, [])

  // Fetch tasks once user is ready
  useEffect(() => {
    if (!user) return

    async function fetchTasks() {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .order('created_at', { ascending: true })

        if (error) throw error
        setTasks(data || [])
      } catch (err) {
        setError('Failed to load tasks')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [user])

  // Handle drag and drop → update in Supabase
  async function handleDragEnd(event) {
    const { active, over } = event
    if (!over) return

    const taskId = active.id
    const newStatus = over.id

    // Update UI
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    )

    // Update in Supabase
    const { error } = await supabase
      .from('tasks')
      .update({ status: newStatus })
      .eq('id', taskId)

    if (error) {
      console.error('Failed to update task:', error)
      setError('Failed to update task')
    }
  }

  // Create new tasks
  async function handleCreateTask({ title, priority }) {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{
          title,
          priority,
          status: 'todo',
          user_id: user.id
        }])
        .select()
        .single()

      if (error) throw error
      setTasks(prev => [...prev, data])
    } catch (err) {
      console.error('Failed to create task:', err)
      setError('Failed to create task')
    }
  }

  // Delete a task
  async function handleDeleteTask(taskId) {
    // Optimistic update
    setTasks(prev => prev.filter(t => t.id !== taskId))

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId)

    if (error) {
      console.error('Failed to delete task:', error)
      setError('Failed to delete task')
    }
  }

  // Edit a task
  async function handleEditTask({ title, priority, status }) {
    const taskId = editingTask.id

    // Optimistic update
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, title, priority, status } : task
      )
    )
    setEditingTask(null)

    const { error } = await supabase
      .from('tasks')
      .update({ title, priority, status })
      .eq('id', taskId)

    if (error) {
      console.error('Failed to edit task:', error)
      setError('Failed to edit task')
    }
  }

  if (loading) return <p>Loading your board...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <>
      <div style={{ padding: '24px 24px 0' }}>
        <button
          onClick={() => setModalStatus('todo')}
          style={{
            padding: '8px 16px', borderRadius: '6px',
            border: 'none', cursor: 'pointer',
            background: '#4f46e5', color: 'white',
            fontSize: '14px'
          }}
        >
          + New Task
        </button>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <div
          onClick={() => setActiveMenu(null)}
          style={{ display: 'flex', gap: '16px', padding: '24px' }}
        >
          {COLUMNS.map(col => (
            <Column
              key={col}
              id={col}
              title={COLUMN_LABELS[col]}
              tasks={tasks.filter(t => t.status === col)}
              onDelete={handleDeleteTask}
              onEdit={setEditingTask}
              onAddTask={(status) => setModalStatus(status)}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
            />
          ))}
        </div>
      </DndContext>

      {modalStatus && (
        <NewTaskModal
          onClose={() => setModalStatus(null)}
          onSubmit={handleCreateTask}
          defaultStatus={modalStatus}
        />
      )}

      {editingTask && (
        <NewTaskModal
          onClose={() => setEditingTask(null)}
          onSubmit={handleEditTask}
          editTask={editingTask}
        />
      )}
    </>
  )
}

export default Board