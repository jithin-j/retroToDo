import { DoubleBorder, Blink } from './ui';
import { COLUMNS } from '../lib/tasks';

export default function Composer({ inputRef, draft, setDraft, target, setTarget, onAdd }) {
  const handleKey = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); onAdd(); }
  };

  return (
    <section style={{ marginBottom: 28 }}>
      <DoubleBorder accent style={{ padding: '14px 16px', background: 'var(--paper)' }}>
        <div className="composer-inner" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: 'var(--accent)', fontFamily: 'VT323, monospace', fontSize: 28, lineHeight: 1 }}>
            &gt;
          </span>
          <input
            ref={inputRef}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={handleKey}
            placeholder="NEW TASK ── what needs doing?"
            className="composer-input"
            style={styles.input}
            spellCheck="false"
            autoComplete="off"
          />
          <span className="blink-cursor">
            <Blink>
              <span style={{ color: 'var(--accent)', fontFamily: 'VT323, monospace', fontSize: 28, lineHeight: 1 }}>▌</span>
            </Blink>
          </span>

          <div className="composer-chips" style={{ display: 'flex', gap: 6, marginLeft: 12 }}>
            {COLUMNS.map(col => {
              const active = col.id === target;
              return (
                <button
                  key={col.id}
                  onClick={() => setTarget(col.id)}
                  style={{
                    ...styles.chip,
                    color: active ? 'var(--paper)' : 'var(--ink-soft)',
                    background: active ? 'var(--accent)' : 'transparent',
                    borderColor: active ? 'var(--accent)' : 'var(--rule)',
                  }}
                >
                  {active ? '▸ ' : '  '}{col.label}
                </button>
              );
            })}
          </div>

          <button className="composer-add" onClick={onAdd} style={styles.addBtn} title="Add task (Enter)">
            <span style={{ fontFamily: 'VT323, monospace', fontSize: 24, lineHeight: 1 }}>[ + ADD ]</span>
          </button>
        </div>
      </DoubleBorder>
    </section>
  );
}

const styles = {
  input: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    fontFamily: 'IBM Plex Mono, monospace',
    fontSize: 16,
    color: 'var(--ink)',
    padding: '4px 0',
    minWidth: 0,
  },
  chip: {
    fontFamily: 'IBM Plex Mono, monospace',
    fontSize: 11,
    letterSpacing: 1,
    padding: '4px 10px',
    border: '1.5px solid',
    cursor: 'pointer',
    background: 'transparent',
  },
  addBtn: {
    border: '1.5px solid var(--accent)',
    background: 'var(--accent)',
    color: 'var(--paper)',
    padding: '4px 12px',
    cursor: 'pointer',
    boxShadow: '2px 2px 0 var(--ink)',
    marginLeft: 4,
    flexShrink: 0,
  },
};
