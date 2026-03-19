function ProgressBar({ label, value, max = 100, color }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div className="pbar-wrap">
      {label && (
        <div className="pbar-label">
          <span>{label}</span>
          <span>{pct}%</span>
        </div>
      )}
      <div className="pbar-track">
        <div
          className="pbar-fill"
          style={{ width: `${pct}%`, background: color ?? 'var(--brand)' }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
