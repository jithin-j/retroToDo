export const LS_TASKS = 'retro_todo.tasks.v2';
export const LS_THEME = 'retro_todo.theme.v1';

export const COLUMNS = [
  { id: 'pending',  label: 'PENDING',     sub: '// queue'   },
  { id: 'progress', label: 'IN PROGRESS', sub: '// working' },
  { id: 'done',     label: 'DONE',        sub: '// archive' },
];
export const COL_IDS = COLUMNS.map(c => c.id);

export function uid() {
  return Math.random().toString(36).slice(2, 9);
}

// Migrate old column names from v1 data
const COL_MIGRATE = { today: 'pending', upcoming: 'progress', done: 'done' };
export function migrate(tasks) {
  if (!Array.isArray(tasks)) return tasks;
  return tasks.map(t => ({ ...t, col: COL_MIGRATE[t.col] || t.col || 'pending' }));
}
