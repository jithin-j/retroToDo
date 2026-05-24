import { useState, useEffect, useRef, useMemo } from 'react';
import Header from './components/Header';
import Composer from './components/Composer';
import Column from './components/Column';
import Footer from './components/Footer';
import { COLUMNS, COL_IDS, uid, migrate, LS_TASKS, LS_THEME } from './lib/tasks';
import { load, save } from './lib/storage';

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const stored = load(LS_TASKS, null);
    return stored ? migrate(stored) : [];
  });
  const [theme, setTheme] = useState(() => load(LS_THEME, 'light'));
  const [draft, setDraft] = useState('');
  const [target, setTarget] = useState('pending');
  const [editingId, setEditingId] = useState(null);
  const [dragId, setDragId] = useState(null);
  const [dragOverCol, setDragOverCol] = useState(null);
  const [tick, setTick] = useState(Date.now());
  const inputRef = useRef(null);

  // clock tick
  useEffect(() => {
    const t = setInterval(() => setTick(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  // theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    save(LS_THEME, theme);
  }, [theme]);

  // persist tasks
  useEffect(() => { save(LS_TASKS, tasks); }, [tasks]);

  // keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        inputRef.current?.blur();
        setEditingId(null);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        setTheme(t => t === 'light' ? 'dark' : 'light');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const addTask = () => {
    const text = draft.trim();
    if (!text) return;
    setTasks(prev => [
      ...prev,
      { id: uid(), text, col: target, done: target === 'done', ts: Date.now() },
    ]);
    setDraft('');
  };

  const toggleDone = (id) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== id) return t;
      const done = !t.done;
      let col = t.col;
      if (done && col !== 'done') col = 'done';
      else if (!done && col === 'done') col = 'pending';
      return { ...t, done, col };
    }));
  };

  const removeTask = (id) => setTasks(prev => prev.filter(t => t.id !== id));

  const moveTask = (id, dir) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== id) return t;
      const i = COL_IDS.indexOf(t.col);
      const newCol = COL_IDS[Math.max(0, Math.min(COL_IDS.length - 1, i + dir))];
      return { ...t, col: newCol, done: newCol === 'done' ? true : (t.col === 'done' ? false : t.done) };
    }));
  };

  const moveTaskTo = (id, newCol) => {
    if (!COL_IDS.includes(newCol)) return;
    setTasks(prev => prev.map(t => {
      if (t.id !== id || t.col === newCol) return t;
      return { ...t, col: newCol, done: newCol === 'done' ? true : (t.col === 'done' ? false : t.done), ts: Date.now() };
    }));
  };

  const renameTask = (id, text) => setTasks(prev => prev.map(t => t.id === id ? { ...t, text } : t));

  const clearDone = () => setTasks(prev => prev.filter(t => t.col !== 'done'));

  const grouped = useMemo(() => {
    const g = { pending: [], progress: [], done: [] };
    for (const t of tasks) g[t.col]?.push(t);
    g.pending.sort((a, b) => a.ts - b.ts);
    g.progress.sort((a, b) => a.ts - b.ts);
    g.done.sort((a, b) => b.ts - a.ts);
    return g;
  }, [tasks]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter(t => t.done).length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    return { total, done, open: total - done, pct };
  }, [tasks]);

  return (
    <div className="app-shell" style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 28px 60px' }}>
      <Header theme={theme} setTheme={setTheme} tick={tick} />

      <main>
        <Composer
          inputRef={inputRef}
          draft={draft}
          setDraft={setDraft}
          target={target}
          setTarget={setTarget}
          onAdd={addTask}
        />

        <section
          className="board-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginBottom: 28 }}
        >
          {COLUMNS.map(col => (
            <Column
              key={col.id}
              col={col}
              tasks={grouped[col.id]}
              editingId={editingId}
              setEditingId={setEditingId}
              onToggle={toggleDone}
              onRemove={removeTask}
              onMove={moveTask}
              onMoveTo={moveTaskTo}
              onRename={renameTask}
              onClearDone={clearDone}
              dragId={dragId}
              setDragId={setDragId}
              dragOverCol={dragOverCol}
              setDragOverCol={setDragOverCol}
            />
          ))}
        </section>

        <Footer stats={stats} />
      </main>
    </div>
  );
}
