export function DoubleBorder({ children, style, accent = false, padding = 0, className, onClick, title, onDragOver, onDragLeave, onDrop }) {
  const c = accent ? 'var(--accent)' : 'var(--rule)';
  return (
    <div
      className={className}
      onClick={onClick}
      title={title}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      style={{
        position: 'relative',
        border: `1.5px solid ${c}`,
        boxShadow: `inset 0 0 0 3px var(--bg), inset 0 0 0 4.5px ${c}`,
        padding,
        background: 'transparent',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Blink({ children }) {
  return (
    <span style={{ animation: 'blink 1.05s steps(2, end) infinite' }}>
      {children}
    </span>
  );
}
