import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Bell, BookOpen, ChevronDown, ChevronUp, Cpu,
  Globe, Mail, MapPin, MessageSquare, Phone,
  ShieldCheck, Star, Target, Trophy, Users, Zap,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import EventCard from '../components/EventCard'
import CountdownTimer from '../components/CountdownTimer'
import { filterEvents, groupEventsByDate } from '../utils/eventUtils'

/* -- static content --------------------------------------- */

const CATEGORIES = [
  { key: 'Hackathon',   label: 'Hackathons',   Icon: Cpu,          color: '#136f63', desc: 'Build innovative products in 24-72 hours with mentors and prizes.' },
  { key: 'Workshop',    label: 'Workshops',    Icon: BookOpen,     color: '#6b4faa', desc: 'Hands-on, instructor-led skill sessions for deep learning.' },
  { key: 'Competition', label: 'Competitions', Icon: Trophy,       color: '#b5541a', desc: 'Showcase algorithmic, design or domain-specific expertise.' },
  { key: 'Symposium',   label: 'Symposiums',   Icon: MessageSquare,color: '#1a6ab5', desc: 'Multi-session knowledge exchange and networking fests.' },
  { key: 'Cultural',    label: 'Cultural',     Icon: Star,         color: '#a04eb5', desc: 'Dance, drama, art, music, and multi-talent stage events.' },
  { key: 'Seminar',     label: 'Seminars',     Icon: Globe,        color: '#0e7490', desc: 'Expert-led talks, panels and Q&A sessions on trending topics.' },
]

const STEPS = [
  {
    num: '01', title: 'Discover',
    desc: 'Browse events from multiple colleges filtered by type, branch, date, or city. No more missed announcements scattered across chat groups or notice boards.',
  },
  {
    num: '02', title: 'Save & Register',
    desc: 'Bookmark events that interest you and register in one click. Keep every opportunity organized in your personal dashboard.',
  },
  {
    num: '03', title: 'Track & Attend',
    desc: 'Receive live deadline countdowns, smart reminders and prep resources. Never miss a submission window or an event you intended to join.',
  },
]

const BENEFITS = [
  { Icon: Bell,        title: 'Smart Deadline Alerts',     desc: 'Automated reminders are sent 7 days, 3 days, and 24 hours before every registration deadline.' },
  { Icon: Target,      title: 'AI-Powered Recommendations',desc: 'Events are scored by branch relevance, declared interests, and past registration behavior - not just popularity.' },
  { Icon: Users,       title: 'Team Formation Engine',     desc: 'Post open-team requests by role and skill. Find collaborators for hackathons before the event even starts.' },
  { Icon: ShieldCheck, title: 'Verified Event Pipeline',   desc: 'Every event passes an admin approval workflow before going live. No fake posters, no spam registrations.' },
  { Icon: Zap,         title: 'Instant Registration',      desc: 'Connect your student profile once. Register for any affiliated event without re-entering your details.' },
  { Icon: Globe,       title: 'Multi-College Discovery',   desc: 'Aggregates events from colleges across Tamil Nadu, Karnataka, and beyond into a single scrollable feed.' },
]

const TESTIMONIALS = [
  { name: 'Kunal M.', college: 'Tech Valley Institute, Chennai', text: 'Before EventSphere, I missed the CodeStorm deadline by two hours. Now every deadline is on my dashboard with a live countdown.' },
  { name: 'Priya S.', college: 'NCE, Coimbatore',                text: 'The recommendations are eerily accurate. As a Mech student interested in IoT, it surfaced the Robotics Build Day that I would have never found otherwise.' },
  { name: 'Devika I.', college: 'Metro Arts, Bengaluru',         text: 'Our college got 3x more registrations after listing on EventSphere. The analytics dashboard is gold for organizers.' },
]

const EVENT_FAQ = [
  { q: 'Can I register as a team?', a: 'Yes. Most hackathons accept teams of 2-4. Individual applications are also accepted and can be matched through our Team Finder module before the event.' },
  { q: 'Is there a registration fee?', a: 'Registration is free unless explicitly noted. Check the registration link for payment details specific to each event.' },
  { q: 'How will I receive my participation certificate?', a: 'Certificates are issued digitally within 7 days of event conclusion and become available in your EventSphere Certificates section.' },
  { q: 'Can I register without a college email?', a: 'A college email is preferred for verification but personal email is accepted with a manual review step by our moderation team.' },
  { q: 'What happens if I miss the deadline?', a: 'Registrations close exactly at the deadline. You can enable alerts on EventSphere to ensure you are reminded well in advance.' },
  { q: 'Are online/hybrid modes available?', a: 'Hybrid and fully remote editions are possible; the event page will clearly mark the participation mode.' },
]

const ABOUT_PROBLEM_POINTS = [
  'Event announcements are fragmented across WhatsApp groups, Instagram stories, college notice boards, and third-party websites.',
  'Students often discover an event after its registration deadline has already passed.',
  'There is no standard format for event information - contact details, prize structure, eligibility, and schedule are inconsistently presented.',
  'Organizers have no analytics-grade insight into reach, conversions, or student interest patterns.',
  'Students with niche interests (IoT, Cyber Security, Robotics) rarely find events tailored to their branch.',
]

/* -- components ------------------------------------------- */

function FAQ({ items }) {
  const [openIdx, setOpenIdx] = useState(null)
  return (
    <div className="faq-list">
      {items.map((item, i) => (
        <div className="faq-item" key={i}>
          <button className="faq-question" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
            {item.q}
            {openIdx === i ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
          </button>
          {openIdx === i && <p className="faq-answer">{item.a}</p>}
        </div>
      ))}
    </div>
  )
}

/* -- pages ------------------------------------------------ */

export function HomePage() {
  const { allEvents, colleges } = useApp()
  const featured = allEvents.filter((e) => e.featured).slice(0, 3)

  return (
    <div className="section">
      <div className="hero-panel">
        <p className="eyebrow">Discover college events</p>
        <h2>Browse hackathons, workshops, symposiums, and competitions in one simple place.</h2>
        <p className="hero-sub">
          A clean event listing experience for students to explore, save, and track upcoming events.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-lg" to="/events">Explore Events</Link>
          <Link className="btn btn-secondary btn-lg" to="/student/dashboard">My Dashboard</Link>
        </div>
        <div className="stats-banner">
          <div className="stat-pill"><strong>{allEvents.length}</strong><span>Live Events</span></div>
          <div className="stat-pill"><strong>{colleges.length}</strong><span>Partner Colleges</span></div>
          <div className="stat-pill"><strong>50+</strong><span>Categories</span></div>
          <div className="stat-pill"><strong>10K+</strong><span>Monthly Visitors</span></div>
        </div>
      </div>

      <div className="section-header">
        <h3>Browse by Category</h3>
      </div>
      <div className="cat-grid">
        {CATEGORIES.slice(0, 5).map(({ key, label, Icon, color }) => (
          <Link to="/events" className="cat-tile" key={key} style={{ '--tile-color': color }}>
            <Icon size={26} />
            <div>
              <strong>{label}</strong>
              <p>Explore events</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="section-header">
        <h3>Featured Events</h3>
        <p className="section-sub">Handpicked events you should not miss.</p>
      </div>
      <div className="grid-cards">
        {featured.map((event) => (
          <EventCard key={event.id} event={event} isSaved={false} isRegistered={false} onToggleSaved={() => {}} onToggleRegistered={() => {}} />
        ))}
      </div>
    </div>
  )
}

/* --------------------------- */

function ExploreBase({ presetCategory }) {
  const { allEvents, savedEventIds, registeredEventIds, toggleSaved, toggleRegistered } = useApp()

  const [filters, setFilters] = useState({
    search: '', category: '', location: '',
  })
  const [sortBy, setSortBy] = useState('date')

  const categories = [...new Set(allEvents.map((e) => e.category))]
  const locations  = [...new Set(allEvents.map((e) => e.location))]

  const filteredEvents = useMemo(() => {
    const base = filterEvents(allEvents, {
      ...filters,
      category: presetCategory ?? filters.category,
    })
    return [...base].sort((a, b) => {
      if (sortBy === 'date')     return new Date(a.date) - new Date(b.date)
      if (sortBy === 'deadline') return new Date(a.deadline) - new Date(b.deadline)
      return a.title.localeCompare(b.title)
    })
  }, [allEvents, filters, presetCategory, sortBy])

  return (
    <section className="section">
      <div className="section-header">
        <h2>{presetCategory ? `${presetCategory} Events` : 'Explore Events'}</h2>
        <p className="section-sub">Discover hackathons, workshops, and events from colleges across India.</p>
      </div>

      <div className="card explore-filter-card">
        <div className="filter-top-row">
          <input
            placeholder="Search events, colleges, tags..."
            value={filters.search}
            onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
          />
          <button className="btn btn-ghost btn-sm" onClick={() => setFilters({ search: '', category: '', location: '' })}>
            Filters
          </button>
        </div>
        <div className="filter-fields-row">
          {!presetCategory && (
            <div>
              <p className="field-label">Category</p>
              <select value={filters.category} onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}>
                <option value="">All Categories</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          )}
          <div>
            <p className="field-label">Location</p>
            <select value={filters.location} onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))}>
              <option value="">All Locations</option>
              {locations.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <p className="field-label">Sort By</p>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="date">Event Date</option>
              <option value="deadline">Deadline</option>
              <option value="title">A to Z</option>
            </select>
          </div>
        </div>
      </div>

      <p className="results-count">
        Found {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
      </p>

      {filteredEvents.length === 0 ? (
        <div className="info-box">No events match the current filters. Try clearing a filter above.</div>
      ) : (
        <div className="grid-cards event-grid-3">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isSaved={savedEventIds.includes(event.id)}
              isRegistered={registeredEventIds.includes(event.id)}
              onToggleSaved={toggleSaved}
              onToggleRegistered={toggleRegistered}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export function ExploreEventsPage()    { return <ExploreBase /> }
export function ExploreHackathonsPage(){ return <ExploreBase presetCategory="Hackathon" /> }
export function WorkshopsPage()        { return <ExploreBase presetCategory="Workshop" /> }
export function CompetitionsPage()     { return <ExploreBase presetCategory="Competition" /> }

/* --------------------------- */

export function FeaturedEventsPage() {
  const { allEvents } = useApp()
  const featured = allEvents.filter((e) => e.featured)
  return (
    <section className="section">
      <div className="section-header">
        <p className="eyebrow">Editor's Pick</p>
        <h2>Featured Events</h2>
        <p className="section-sub">Featured picks from the latest listings.</p>
      </div>
      <div className="grid-cards event-grid-3">
        {featured.map((e) => (
          <EventCard key={e.id} event={e} isSaved={false} isRegistered={false} onToggleSaved={() => {}} onToggleRegistered={() => {}} />
        ))}
      </div>
    </section>
  )
}

/* --------------------------- */

export function EventCalendarPage() {
  const { allEvents } = useApp()
  const [viewYear,  setViewYear]  = useState(2026)
  const [viewMonth, setViewMonth] = useState(3) // 0-indexed; 3 = April

  const grouped     = groupEventsByDate(allEvents)
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const firstOffset = new Date(viewYear, viewMonth, 1).getDay()
  const monthLabel  = new Date(viewYear, viewMonth, 1).toLocaleString('default', { month: 'long', year: 'numeric' })

  const cells = [...Array(firstOffset).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]

  const eventsInMonth = allEvents.filter((e) => {
    const d = new Date(e.date)
    return d.getFullYear() === viewYear && d.getMonth() === viewMonth
  })

  const prevMonth = () => viewMonth === 0 ? (setViewMonth(11), setViewYear((y) => y - 1)) : setViewMonth((m) => m - 1)
  const nextMonth = () => viewMonth === 11 ? (setViewMonth(0), setViewYear((y) => y + 1)) : setViewMonth((m) => m + 1)

  return (
    <section className="section">
      <div className="section-header">
        <p className="eyebrow">Time Planning</p>
        <h2>Event Calendar</h2>
        <p className="section-sub">
          A bird's-eye date view of all campus events. Use the month navigator to plan
          ahead, track overlapping deadlines, and avoid registration conflicts. Events
          shown in green have at least one listing that day - click a day tile to see them.
        </p>
      </div>

      <div className="card">
        <div className="calendar-controls">
          <button className="btn btn-ghost btn-sm" onClick={prevMonth}>&lt;- Prev</button>
          <h3 style={{ margin: 0 }}>{monthLabel}</h3>
          <button className="btn btn-ghost btn-sm" onClick={nextMonth}>Next -&gt;</button>
        </div>
        <div className="calendar-daynames">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d) => (
            <div key={d} className="cal-dayname">{d}</div>
          ))}
        </div>
        <div className="calendar-month-grid">
          {cells.map((day, idx) => {
            if (!day) return <div key={`e-${idx}`} className="calendar-cell empty" />
            const ds = `${viewYear}-${String(viewMonth + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`
            const dayEvents = grouped[ds] ?? []
            return (
              <div key={day} className={`calendar-cell ${dayEvents.length ? 'has-events' : ''}`}>
                <span className="cal-date">{day}</span>
                {dayEvents.slice(0, 2).map((e) => (
                  <Link key={e.id} to={`/events/${e.id}`} className="cal-event-dot" title={e.title}>
                    {e.title.slice(0, 10)}...
                  </Link>
                ))}
                {dayEvents.length > 2 && <span className="cal-more">+{dayEvents.length - 2}</span>}
              </div>
            )
          })}
        </div>
      </div>

      <div className="section-header">
        <h3>Events in {monthLabel}</h3>
        <p className="section-sub">{eventsInMonth.length} event{eventsInMonth.length !== 1 ? 's' : ''} scheduled this month.</p>
      </div>

      {eventsInMonth.length === 0 ? (
        <div className="info-box">No events scheduled for this month. Navigate to April 2026 to see live listings.</div>
      ) : (
        <div className="calendar-event-list">
          {eventsInMonth.map((event) => (
            <div className="card cal-event-row" key={event.id}>
              <div className="cal-event-date">
                <span className="cal-day-num">{new Date(event.date).getDate()}</span>
                <span className="cal-month-abbr">
                  {new Date(event.date).toLocaleString('default', { month: 'short' })}
                </span>
              </div>
              <div className="cal-event-info">
                <h4>{event.title}</h4>
                <p className="muted-text">{event.college} - {event.location}</p>
              </div>
              <div className="cal-event-actions">
                <span className="chip">{event.category}</span>
                <CountdownTimer deadline={event.deadline} />
                <Link className="btn btn-sm" to={`/events/${event.id}`}>Details</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

/* --------------------------- */

export function CollegeListPage() {
  const { colleges, allEvents } = useApp()
  return (
    <section className="section">
      <div className="section-header">
        <p className="eyebrow">Partner Institutions</p>
        <h2>College Profiles</h2>
        <p className="section-sub">
          Each college on EventSphere has a verified profile managed by a designated
          Event Coordinator. Profiles include upcoming and past events, contact info,
          and an average event-quality rating sourced from participant feedback.
        </p>
      </div>
      <div className="grid-cards">
        {colleges.map((college) => {
          const upcoming = allEvents.filter((e) => e.collegeId === college.id)
          return (
            <article className="card" key={college.id}>
              <div className="chip chip-info" style={{ marginBottom: '0.5rem' }}>{college.city}</div>
              <h3>{college.name}</h3>
              <p className="muted-text" style={{ marginTop: '0.3rem' }}>{college.description}</p>
              <p style={{ marginTop: '0.5rem' }}>
                <strong>Contact:</strong> {college.contact}
              </p>
              <p style={{ marginTop: '0.35rem' }}>
                <strong>{upcoming.length}</strong> active listing{upcoming.length !== 1 ? 's' : ''} on EventSphere
              </p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

/* --------------------------- */

export function EventDetailsPage({ eventId }) {
  const { allEvents, savedEventIds, registeredEventIds, toggleSaved, toggleRegistered } = useApp()
  const event = allEvents.find((e) => e.id === eventId)

  if (!event) {
    return (
      <section className="section">
        <div className="info-box">Event not found. It may have been removed or the link is incorrect.</div>
        <Link to="/events" className="btn" style={{ marginTop: '0.75rem' }}>&lt;- Back to Events</Link>
      </section>
    )
  }

  const similar = allEvents.filter((e) => e.id !== event.id && e.category === event.category).slice(0, 3)

  return (
    <section className="section">
      {/* HEADER */}
      <div className="event-detail-header">
        <img src={event.poster} alt={event.title} className="detail-poster" />
        <div className="card event-detail-info">
          <span className="chip">{event.category}</span>
          <h2>{event.title}</h2>
          <p className="muted-text">{event.college}</p>
          <p style={{ lineHeight: '1.75' }}>{event.description}</p>

          <div className="info-grid">
            <div><strong>Location</strong><p>{event.location}</p></div>
            <div><strong>Event Date</strong><p>{event.date}</p></div>
            <div><strong>Prize Pool</strong><p>{event.prizeMoney}</p></div>
            <div><strong>Reg. Deadline</strong><p>{new Date(event.deadline).toLocaleString()}</p></div>
          </div>

          <div>
            <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>Time Left to Register</p>
            <CountdownTimer deadline={event.deadline} />
          </div>

          <div className="event-detail-actions">
            <a className="btn" href={event.registrationLink} target="_blank" rel="noreferrer">Register Now</a>
            <button className="btn btn-ghost" onClick={() => toggleSaved(event.id)}>
              {savedEventIds.includes(event.id) ? 'Saved' : 'Save'}
            </button>
            <button className="btn btn-secondary" onClick={() => toggleRegistered(event.id)}>
              {registeredEventIds.includes(event.id) ? 'Marked Registered' : 'Mark Registered'}
            </button>
          </div>
        </div>
      </div>

      {/* PRIZE TIERS */}
      <div className="card">
        <h3>Prize Structure</h3>
        <p className="muted-text">Prize amounts are indicative and subject to the event's official announcement.</p>
        <div className="prize-tiers">
          <div className="prize-tier gold">
            <div className="prize-rank">1st Place</div>
            <div className="prize-amount">Rs 75,000</div>
          </div>
          <div className="prize-tier silver">
            <div className="prize-rank">2nd Place</div>
            <div className="prize-amount">Rs 50,000</div>
          </div>
          <div className="prize-tier bronze">
            <div className="prize-rank">3rd Place</div>
            <div className="prize-amount">Rs 25,000</div>
          </div>
        </div>
      </div>

      {/* WHO SHOULD ATTEND */}
      <div className="card">
        <h3>Who Should Attend</h3>
        <p className="muted-text" style={{ marginBottom: '0.6rem' }}>
          This event is primarily designed for students from the following departments. All
          years are eligible unless the registration link specifies otherwise. Interdisciplinary
          teams are strongly encouraged - diverse perspectives lead to stronger solutions.
        </p>
        <div className="branch-tags">
          {event.branchFocus.map((b) => (
            <span key={b} className="tag-pill active">{b}</span>
          ))}
        </div>
        <div className="info-box" style={{ marginTop: '0.75rem' }}>
          <strong>Tip:</strong> Students from adjacent branches often win by combining domain
          knowledge with technical skills. Don't disqualify yourself without reading the full
          eligibility section in the registration form.
        </div>
      </div>

      {/* SCHEDULE TIMELINE */}
      <div className="card">
        <h3>Event Schedule</h3>
        <p className="muted-text">Indicative schedule - exact timings will be confirmed via email after registration.</p>
        <div className="timeline-list">
          {[
            { time: 'Day 0 - 9:00 AM',  label: 'Registration Opens & Team ID Verification' },
            { time: 'Day 0 - 11:00 AM', label: 'Problem Statement Reveal & Opening Fireside Chat' },
            { time: 'Day 0 - 2:00 PM',  label: 'Ideation Phase + API & Dataset Access' },
            { time: 'Day 1 - 12:00 PM', label: 'Mid-Hack Checkpoint + Mentor Rotation' },
            { time: 'Day 1 - 6:00 PM',  label: 'Final Submission Portal Closes' },
            { time: 'Day 2 - 10:00 AM', label: 'Project Demos + Jury Evaluation' },
            { time: 'Day 2 - 4:00 PM',  label: 'Results Announcement & Prize Distribution' },
          ].map((item, i) => (
            <div className="timeline-entry" key={i}>
              <div className="timeline-dot" />
              <div>
                <strong>{item.time}</strong>
                <p>{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="card">
        <h3>Frequently Asked Questions</h3>
        <FAQ items={EVENT_FAQ} />
      </div>

      {/* SIMILAR EVENTS */}
      {similar.length > 0 && (
        <div className="section">
          <div className="section-header">
            <h3>Similar {event.category} Events</h3>
          </div>
          <div className="grid-cards">
            {similar.map((e) => (
              <article className="card featured-event-card" key={e.id}>
                <img src={e.poster} alt={e.title} className="featured-poster" />
                <div className="featured-body">
                  <span className="chip">{e.category}</span>
                  <h4>{e.title}</h4>
                  <p className="muted-text">{e.college}</p>
                  <Link to={`/events/${e.id}`} className="btn btn-sm">View</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export function SearchResultsPage() { return <ExploreBase /> }

/* --------------------------- */

export function AboutPage() {
  return (
    <section className="section">
      {/* MISSION */}
      <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
        <p className="eyebrow">Our Mission</p>
        <h2>Democratizing Event Discovery for Every College Student</h2>
        <p className="muted-text" style={{ maxWidth: '650px', margin: '0.75rem auto 0' }}>
          EventSphere exists to ensure that no student misses a career-defining opportunity
          simply because the information didn't reach them in time. We are building India's
          most trusted, structured, and intelligent campus event discovery platform.
        </p>
      </div>

      {/* PROBLEM */}
      <div className="section-header">
        <p className="eyebrow">The Problem We Solve</p>
        <h3>Why students miss hackathons and events</h3>
      </div>
      <div className="problem-box">
        <strong style={{ display: 'block', marginBottom: '0.6rem' }}>Current Pain Points</strong>
        <ul style={{ margin: 0, paddingLeft: '1.3rem', lineHeight: '2', color: 'var(--ink)' }}>
          {ABOUT_PROBLEM_POINTS.map((point, i) => <li key={i}>{point}</li>)}
        </ul>
      </div>

      {/* SOLUTION */}
      <div className="section-header">
        <p className="eyebrow">Our Approach</p>
        <h3>How EventSphere solves it</h3>
      </div>
      <div className="tech-stack-grid">
        {[
          { title: 'Aggregation',      desc: 'All events from participating colleges are submitted through a standardised form, ensuring consistent data quality across every listing.' },
          { title: 'Recommendation',   desc: 'A scoring algorithm factors in student branch, declared interests, and past registrations to surface the most relevant events first.' },
          { title: 'Deadline Tracking',desc: 'Live countdown timers and multi-stage push notifications ensure students never approach a deadline without awareness.' },
          { title: 'Team Formation',   desc: 'Students can post open-team listings by role, allowing solo participants to assemble a full team before the event itself.' },
          { title: 'Verified Listings',desc: 'An admin approval pipeline ensures every event is legitimate, with complete information, before it appears in the public feed.' },
          { title: 'Organizer Tools',  desc: 'Colleges get participant tracking, export options, analytics dashboards, and one-click communication tools at no cost.' },
        ].map((item) => (
          <div className="arch-card" key={item.title}>
            <h4>{item.title}</h4>
            <p className="muted-text" style={{ fontSize: '0.9rem', lineHeight: '1.7' }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* ARCHITECTURE */}
      <div className="section-header">
        <p className="eyebrow">Technical Design</p>
        <h3>Platform Architecture</h3>
        <p className="section-sub">A full-stack web application designed for scalability, security, and fast discovery.</p>
      </div>
      <div className="tech-stack-grid">
        {[
          { title: 'Frontend (React)',   items: ['Vite build toolchain', 'React Router v6 for multi-page routing', 'Context API for shared app state', 'Lucide React icons', 'Custom CSS design system'] },
          { title: 'Backend (Node.js)',  items: ['Express REST API', 'JWT authentication', 'Role-based middleware (student / organizer / admin)', 'Mongoose ODM for MongoDB', 'Nodemailer for email alerts'] },
          { title: 'Database (MongoDB)', items: ['Users collection', 'Events collection', 'Registrations collection', 'Notifications collection', 'Indexed text search on events'] },
          { title: 'Advanced Modules',  items: ['Recommendation scoring engine', 'Auto event scraper pipeline (Devpost, Unstop)', 'Google Maps API integration', 'CSV participant export', 'Cron-based deadline reminders'] },
        ].map((layer) => (
          <div className="arch-card" key={layer.title}>
            <h4>{layer.title}</h4>
            <ul>{layer.items.map((i) => <li key={i}>{i}</li>)}</ul>
          </div>
        ))}
      </div>

      {/* USER ROLES */}
      <div className="section-header">
        <p className="eyebrow">Who Uses EventSphere</p>
        <h3>Three User Roles, One Platform</h3>
      </div>
      <div className="role-def-grid">
        {[
          { role: 'Students', items: ['Discover and filter events', 'Register and save events', 'Get AI recommendations', 'Find teammates', 'Receive deadline alerts', 'Download certificates'] },
          { role: 'Organizers', items: ['Post events with rich details', 'Track registrations', 'View event analytics', 'Upload posters and schedule', 'Communicate with participants', 'Export participant lists'] },
          { role: 'Admins', items: ['Approve or reject events', 'Manage college accounts', 'Monitor platform health', 'Access global analytics', 'Generate reports', 'Manage user roles'] },
        ].map((r) => (
          <div className="role-def-card" key={r.role}>
            <h4>{r.role}</h4>
            <ul>{r.items.map((i) => <li key={i}>{i}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  )
}

/* --------------------------- */

export function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="section">
      <div className="section-header">
        <p className="eyebrow">Reach Out</p>
        <h2>Contact EventSphere</h2>
        <p className="section-sub">
          For event listing requests, technical support, partnership proposals,
          or feedback - we typically respond within one business day.
        </p>
      </div>

      <div className="contact-layout">
        {/* LEFT INFO */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h3>Contact Channels</h3>
          <div className="contact-method">
            <div className="contact-icon"><Mail size={18} /></div>
            <div>
              <strong>General Support</strong>
              <p className="muted-text">support@eventsphere.dev</p>
            </div>
          </div>
          <div className="contact-method">
            <div className="contact-icon"><Phone size={18} /></div>
            <div>
              <strong>Organizer Desk</strong>
              <p className="muted-text">+91-90000-12345</p>
            </div>
          </div>
          <div className="contact-method">
            <div className="contact-icon"><MapPin size={18} /></div>
            <div>
              <strong>Registered Office</strong>
              <p className="muted-text">Tech Valley Institute Campus, Chennai - 600001</p>
            </div>
          </div>
          <div className="card" style={{ background: 'var(--bg)', border: 'none', padding: '0.85rem' }}>
            <strong>Response SLA</strong>
            <p className="muted-text" style={{ marginTop: '0.3rem', fontSize: '0.88rem', lineHeight: '1.7' }}>
              General queries: 24 hrs - Organizer onboarding: 48 hrs - Technical bugs: 4 hrs
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="card">
          {sent ? (
            <div className="info-box" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '2rem' }}>Done</div>
              <h3>Message Sent!</h3>
              <p>We'll get back to you at <strong>{form.email}</strong> within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <h3 style={{ margin: 0 }}>Send a Message</h3>
              <div className="form-row">
                <div>
                  <p className="field-label">Full Name</p>
                  <input required placeholder="Varshini C" value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                </div>
                <div>
                  <p className="field-label">Email</p>
                  <input required type="email" placeholder="you@college.edu" value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
                </div>
              </div>
              <div>
                <p className="field-label">Reason for Contact</p>
                <select required value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}>
                  <option value="">Select a topic</option>
                  <option>List an Event</option>
                  <option>Report a Bug</option>
                  <option>Partnership / Sponsorship</option>
                  <option>Account / Login Issue</option>
                  <option>Feedback</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <p className="field-label">Message</p>
                <textarea required rows="5" placeholder="Describe your request in detail..." value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} style={{ width: '100%' }} />
              </div>
              <button type="submit" className="btn">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}


