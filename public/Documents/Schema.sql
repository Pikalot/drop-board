-- Enums
create type task_status as enum (
  'unassigned', 'todo', 'in_progress', 'in_review', 'done'
);

create type task_priority as enum (
  'low', 'normal', 'high'
);

-- Tables
create table tasks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  status task_status not null default 'unassigned',
  priority task_priority default 'normal',
  description text,
  due_date date,
  user_id uuid references auth.users(id),
  created_at timestamp with time zone default now()
);

-- RLS Policies
alter table tasks enable row level security;

-- Policy: users can view their own tasks
create policy "Users can view own tasks" on tasks
  for select using (auth.uid() = user_id);

-- Policy: users can insert their own tasks
create policy "Users can insert own tasks"
  on tasks for insert
  with check (auth.uid() = user_id);

-- Policy: users can update their own tasks
create policy "Users can update own tasks"
  on tasks for update
  using (auth.uid() = user_id);

-- Policy: users can delete their own tasks
create policy "Users can delete own tasks"
  on tasks for delete
  using (auth.uid() = user_id);