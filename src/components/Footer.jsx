const BAR_CELLS = 24;

export default function Footer({ stats }) {
  const filled = Math.round((stats.pct / 100) * BAR_CELLS);

  return (
    <footer style={{ marginTop: 8 }}>
      <span className="ascii-line" style={{ color: 'var(--rule)', fontFamily: 'IBM Plex Mono, monospace' }}>
        ╚═══════════════════════════════════════════════════════════════
      </span>

      <div className="footer-row" style={styles.row}>
        <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
          <Stat label="TOTAL" value={stats.total} />
          <Stat label="OPEN"  value={stats.open}  accent />
          <Stat label="DONE"  value={stats.done} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--ink-mute)', fontFamily: 'IBM Plex Mono, monospace' }}>progress</span>
          <span style={{ color: 'var(--accent)', letterSpacing: 1, fontFamily: 'IBM Plex Mono, monospace' }}>
            {'█'.repeat(filled)}
            <span style={{ color: 'var(--ink-mute)' }}>{'░'.repeat(BAR_CELLS - filled)}</span>
          </span>
          <span style={{ color: 'var(--ink)', minWidth: 38, textAlign: 'right', fontFamily: 'IBM Plex Mono, monospace' }}>
            {String(stats.pct).padStart(3, ' ')}%
          </span>
        </div>
      </div>

      <span className="footer-tagline" style={{ color: 'var(--ink-mute)', fontSize: 12, fontFamily: 'IBM Plex Mono, monospace' }}>
        ── ready. awaiting input. ── data stored locally ── © retro tasks dept. ──
      </span>
    </footer>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
      <span style={{ color: 'var(--ink-mute)', fontSize: 11, letterSpacing: 1.5, fontFamily: 'IBM Plex Mono, monospace' }}>
        {label}
      </span>
      <span style={{ fontFamily: 'VT323, monospace', fontSize: 30, lineHeight: 1, color: accent ? 'var(--accent)' : 'var(--ink)' }}>
        {String(value).padStart(2, '0')}
      </span>
    </div>
  );
}

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 4px',
    gap: 24,
    flexWrap: 'wrap',
  },
};
