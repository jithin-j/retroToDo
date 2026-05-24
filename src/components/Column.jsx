import { DoubleBorder } from './ui';
import TaskItem from './TaskItem';

export default function Column({ col, tasks, editingId, setEditingId, onToggle, onRemove, onMove, onMoveTo, onRename, onClearDone, dragId, setDragId, dragOverCol, setDragOverCol }) {
  const openCount = tasks.filter(t => !t.done).length;
  const isOver = dragOverCol === col.id;

  const onDragOver = (e) => {
    if (!dragId) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverCol !== col.id) setDragOverCol(col.id);
  };

  const onDragLeave = (e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    if (dragOverCol === col.id) setDragOverCol(null);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain') || dragId;
    if (id) onMoveTo(id, col.id);
    setDragId(null);
    setDragOverCol(null);
  };

  return (
    <DoubleBorder
      accent={isOver}
      className="column-panel"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      style={{
        background: isOver ? 'var(--hi)' : 'var(--paper)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 380,
        transition: 'background .15s ease',
      }}
    >
      <header className="col-header" style={styles.colHeader}>
        <div>
          <div className="col-label" style={styles.colLabel}>{col.label}</div>
          <div style={styles.colSub}>{col.sub}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={styles.colCount}>
            <span style={{ color: 'var(--accent)' }}>{String(tasks.length).padStart(2, '0')}</span>
            <span style={{ color: 'var(--ink-mute)' }}> / {String(openCount).padStart(2, '0')} open</span>
          </div>
          {col.id === 'done' && tasks.length > 0 && (
            <button onClick={onClearDone} style={styles.linkBtn} title="Clear archive">
              ✕ clear all
            </button>
          )}
        </div>
      </header>

      <div style={styles.divider}>
        <span style={{ color: 'var(--rule)', fontFamily: 'IBM Plex Mono, monospace' }}>
          ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
        </span>
      </div>

      <ul style={styles.list}>
        {tasks.length === 0 && (
          <li style={styles.empty}>
            <span style={{ color: isOver ? 'var(--accent)' : 'var(--ink-mute)', fontFamily: 'IBM Plex Mono, monospace' }}>
              {isOver
                ? `── drop here to move to ${col.label} ──`
                : col.id === 'pending'
                  ? '── nothing pending. press / to add ──'
                  : col.id === 'progress'
                    ? '── nothing in progress ──'
                    : '── no completed tasks yet ──'}
            </span>
          </li>
        )}
        {tasks.map((task, i) => (
          <TaskItem
            key={task.id}
            task={task}
            idx={i + 1}
            colId={col.id}
            editing={editingId === task.id}
            setEditing={v => setEditingId(v ? task.id : null)}
            onToggle={() => onToggle(task.id)}
            onRemove={() => onRemove(task.id)}
            onMove={dir => onMove(task.id, dir)}
            onRename={text => onRename(task.id, text)}
            dragId={dragId}
            setDragId={setDragId}
          />
        ))}
      </ul>
    </DoubleBorder>
  );
}

const styles = {
  colHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: '14px 18px 8px',
  },
  colLabel: {
    fontFamily: 'VT323, monospace',
    fontSize: 30,
    lineHeight: 1,
    color: 'var(--ink)',
    letterSpacing: 2,
  },
  colSub: {
    fontSize: 11,
    color: 'var(--ink-mute)',
    letterSpacing: 1,
    marginTop: 2,
  },
  colCount: {
    fontFamily: 'IBM Plex Mono, monospace',
    fontSize: 12,
    letterSpacing: 1,
  },
  linkBtn: {
    marginTop: 2,
    background: 'transparent',
    border: 'none',
    fontFamily: 'IBM Plex Mono, monospace',
    color: 'var(--ink-mute)',
    fontSize: 11,
    cursor: 'pointer',
    padding: 0,
    textDecoration: 'underline',
    textDecorationStyle: 'dotted',
    display: 'block',
  },
  divider: {
    padding: '0 12px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  list: {
    listStyle: 'none',
    padding: '8px 8px 16px',
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    flex: 1,
  },
  empty: {
    padding: '24px 12px',
    textAlign: 'center',
    fontSize: 12,
  },
};
