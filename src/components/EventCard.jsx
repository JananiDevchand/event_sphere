import { Link } from 'react-router-dom'
import { CalendarDays, Clock3, MapPin, Bookmark, BadgeIndianRupee } from 'lucide-react'
import { getDeadlineCountdown } from '../utils/eventUtils'

function EventCard({ event, isSaved, isRegistered, onToggleSaved, onToggleRegistered }) {
  const visibleTags = (event.interests || []).slice(0, 3)

  return (
    <article className="card event-card">
      <div className="event-card-media">
        <img src={event.poster} alt={event.title} className="event-poster" />
        <button className="event-save-btn" onClick={() => onToggleSaved(event.id)} aria-label="Save event">
          <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
        {event.featured && <span className="event-featured-badge">Featured</span>}
      </div>
      <div className="event-content">
        <div className="event-title-row">
          <span className="chip">{event.category}</span>
          {isRegistered && <span className="chip chip-info">Registered</span>}
        </div>
        <h3>{event.title}</h3>
        <p className="event-college-name">{event.college}</p>

        <div className="event-meta">
          <span>
            <MapPin size={15} /> {event.location}
          </span>
          <span>
            <CalendarDays size={15} /> {event.date}
          </span>
          <span>
            <BadgeIndianRupee size={15} /> {event.prizeMoney}
          </span>
          <span>
            <Clock3 size={15} /> {getDeadlineCountdown(event.deadline)}
          </span>
        </div>

        {visibleTags.length > 0 && (
          <div className="event-tag-row">
            {visibleTags.map((tag) => (
              <span key={tag} className="tag-pill">{tag}</span>
            ))}
          </div>
        )}

        <div className="event-actions">
          <Link className="btn event-primary-btn" to={`/events/${event.id}`}>
            View Details
          </Link>
        </div>
      </div>
    </article>
  )
}

export default EventCard
