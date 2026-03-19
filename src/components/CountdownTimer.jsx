import { useEffect, useState } from 'react'

function calcTimeLeft(deadline) {
  const diff = new Date(deadline) - new Date()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function CountdownTimer({ deadline }) {
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(deadline))

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calcTimeLeft(deadline))
    }, 1000)
    return () => clearInterval(interval)
  }, [deadline])

  if (!timeLeft) {
    return <span className="chip chip-danger">Deadline Closed</span>
  }

  return (
    <div className="countdown-strip">
      {[
        ['Days', timeLeft.days],
        ['Hrs', timeLeft.hours],
        ['Min', timeLeft.minutes],
        ['Sec', timeLeft.seconds],
      ].map(([label, val]) => (
        <div key={label} className="countdown-unit">
          <span className="countdown-val">{String(val).padStart(2, '0')}</span>
          <span className="countdown-label">{label}</span>
        </div>
      ))}
    </div>
  )
}

export default CountdownTimer
