import { Blink } from './ui';

export default function Header({ theme, setTheme, tick }) {
  const d = new Date(tick);
  const dateStr = d
    .toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit' })
    .toUpperCase();
  const timeStr = d.toLocaleTimeString(undefined, {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  });

  return (
    <header style={{ marginBottom: 28 }}>
      <div style={styles.topbar}>
        <span style={{ color: 'var(--ink-mute)', fontFamily: 'IBM Plex Mono, monospace' }}>
          ╔═══ retro://tasks ═══ v1.0 ═══════════════════════════════
        </span>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <span style={{ color: 'var(--ink-mute)' }}>{dateStr} · {timeStr}</span>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </div>

      <div style={styles.titleRow}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
          <h1 style={styles.title}>
            ToDO<Blink><span style={{ color: 'var(--accent)', fontWeight: 400 }}>_</span></Blink>
          </h1>
          <div style={{ color: 'var(--ink-soft)', fontSize: 13, lineHeight: 1.4 }}>
            <div>a task terminal, est. 1984</div>
            <div style={{ color: 'var(--ink-mute)' }}>
              type <Kbd>/</Kbd> to focus · <Kbd>⏎</Kbd> to add · <Kbd>⌘D</Kbd> theme · drag{' '}
              <span style={{ color: 'var(--accent)' }}>⠿</span> to move
            </div>
          </div>
        </div>
        <span style={{ color: 'var(--rule)', fontSize: 13, fontFamily: 'IBM Plex Mono, monospace' }}>
          ────────────────●────────●────────────────
        </span>
      </div>
    </header>
  );
}

function ThemeToggle({ theme, setTheme }) {
  const dark = theme === 'dark';
  return (
    <button
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      title="Toggle theme (⌘D)"
      style={styles.themeBtn}
    >
      <span style={{ color: 'var(--ink-mute)', fontFamily: 'IBM Plex Mono, monospace' }}>[</span>
      <span style={{ color: dark ? 'var(--ink-mute)' : 'var(--accent)', fontFamily: 'VT323, monospace', fontSize: 22, lineHeight: 1 }}>
        ☀ DAY
      </span>
      <span style={{ width: 18, textAlign: 'center', color: 'var(--ink-mute)' }}>│</span>
      <span style={{ color: dark ? 'var(--accent)' : 'var(--ink-mute)', fontFamily: 'VT323, monospace', fontSize: 22, lineHeight: 1 }}>
        ☾ NITE
      </span>
      <span style={{ color: 'var(--ink-mute)', fontFamily: 'IBM Plex Mono, monospace', marginLeft: 4 }}>]</span>
    </button>
  );
}

function Kbd({ children }) {
  return (
    <kbd style={styles.kbd}>{children}</kbd>
  );
}

const styles = {
  topbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 12,
    paddingBottom: 8,
    flexWrap: 'wrap',
    gap: 8,
  },
  titleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 6,
  },
  title: {
    fontFamily: 'VT323, monospace',
    fontSize: 96,
    margin: 0,
    lineHeight: 0.85,
    letterSpacing: 2,
    color: 'var(--ink)',
    textShadow: '2px 2px 0 var(--accent)',
  },
  kbd: {
    fontFamily: 'IBM Plex Mono, monospace',
    fontSize: 11,
    padding: '1px 6px',
    border: '1px solid var(--rule)',
    borderBottomWidth: 2,
    borderRadius: 2,
    background: 'var(--paper)',
    color: 'var(--ink-soft)',
    margin: '0 2px',
  },
  themeBtn: {
    border: '1.5px solid var(--rule)',
    background: 'var(--paper)',
    padding: '4px 10px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    color: 'var(--ink)',
    boxShadow: '2px 2px 0 var(--rule)',
  },
};
