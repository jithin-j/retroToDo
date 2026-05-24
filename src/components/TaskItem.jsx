import { useState, useEffect, useRef } from 'react';
import { COL_IDS } from '../lib/tasks';

export default function TaskItem({ task, idx, colId, editing, setEditing, onToggle, onRemove, onMove, onRename, dragId, setDragId }) {
  const [val, setVal] = useState(task.text);
  const [hover, setHover] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => { setVal(task.text); }, [task.text]);
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const commit = () => {
    const trimmed = val.trim();
    if (trimmed) onRename(trimmed);
    setEditing(false);
  };

  const canLeft  = colId !== COL_IDS[0];
  const canRight = colId !== COL_IDS[COL_IDS.length - 1];
  const isDragging = dragId === task.id;

  const onDragStart = (e) => {
    if (editing) { e.preventDefault(); return; }
    setDragId(task.id);
    e.dataTransfer.effectAllowed = 'move';
    try { e.dataTransfer.setData('text/plain', task.id); } catch {}
  };
  const onDragEnd = () => setDragId(null);

  return (
    <li
      draggable={!editing}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...styles.item,
        background: hover ? 'var(--hi)' : 'transparent',
        opacity: isDragging ? 0.4 : 1,
        cursor: editing ? 'text' : 'grab',
        outline: isDragging ? '1px dashed var(--accent)' : 'none',
      }}
    >
      <span style={{ ...styles.grip, opacity: hover || isDragging ? 1 : 0.35 }} title="Drag to move">⠿</span>
      <span style={styles.idx}>{String(idx).padStart(2, '0')}</span>

      <button onClick={onToggle} style={styles.checkbox} title="Toggle done">
        <span style={{ color: task.done ? 'var(--accent)' : 'var(--ink-soft)', fontWeight: 600 }}>
          [{task.done ? 'x' : ' '}]
        </span>
      </button>

      {editing ? (
        <input
          ref={inputRef}
          value={val}
          onChange={e => setVal(e.target.value)}
          onBlur={commit}
          onKeyDown={e => {
            if (e.key === 'Enter') commit();
            if (e.key === 'Escape') { setVal(task.text); setEditing(false); }
          }}
          style={styles.itemInput}
        />
      ) : (
        <span
          onDoubleClick={() => setEditing(true)}
          title="Double-click to edit"
          style={{
            ...styles.itemText,
            color: task.done ? 'var(--ink-mute)' : 'var(--ink)',
            textDecoration: task.done ? 'line-through' : 'none',
            textDecorationColor: 'var(--accent)',
          }}
        >
          {task.text}
        </span>
      )}

      <div style={{ display: 'flex', gap: 4, marginLeft: 'auto', opacity: hover ? 1 : 0, transition: 'opacity .15s ease' }}>
        <button onClick={() => onMove(-1)} disabled={!canLeft}  style={{ ...styles.iconBtn, opacity: canLeft  ? 1 : 0.3 }} title="Move left">◀</button>
        <button onClick={() => onMove(+1)} disabled={!canRight} style={{ ...styles.iconBtn, opacity: canRight ? 1 : 0.3 }} title="Move right">▶</button>
        <button onClick={() => setEditing(true)} style={styles.iconBtn} title="Edit">✎</button>
        <button onClick={onRemove} style={{ ...styles.iconBtn, color: 'var(--accent)' }} title="Delete">✕</button>
      </div>
    </li>
  );
}

const styles = {
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '8px 10px',
    border: '1px dashed transparent',
    transition: 'background .12s ease',
  },
  grip: {
    fontFamily: 'IBM Plex Mono, monospace',
    fontSize: 14,
    color: 'var(--ink-mute)',
    cursor: 'grab',
    userSelect: 'none',
    transition: 'opacity .15s ease',
    lineHeight: 1,
  },
  idx: {
    fontFamily: 'IBM Plex Mono, monospace',
    fontSize: 10,
    color: 'var(--ink-mute)',
    minWidth: 18,
  },
  checkbox: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    fontSize: 14,
    fontFamily: 'IBM Plex Mono, monospace',
  },
  itemText: {
    flex: 1,
    fontFamily: 'IBM Plex Mono, monospace',
    fontSize: 14,
    cursor: 'text',
    overflowWrap: 'anywhere',
  },
  itemInput: {
    flex: 1,
    background: 'var(--bg)',
    border: '1px solid var(--accent)',
    outline: 'none',
    color: 'var(--ink)',
    fontFamily: 'IBM Plex Mono, monospace',
    fontSize: 14,
    padding: '3px 6px',
  },
  iconBtn: {
    background: 'transparent',
    border: '1px solid var(--rule)',
    color: 'var(--ink-soft)',
    fontFamily: 'IBM Plex Mono, monospace',
    fontSize: 11,
    cursor: 'pointer',
    padding: '2px 6px',
    lineHeight: 1,
  },
};
