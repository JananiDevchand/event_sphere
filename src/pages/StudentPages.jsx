import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Bell, BookOpen, CheckSquare, Clock, Code,
  LayoutDashboard, Lightbulb, MapPin, Pencil, Sparkles, Users,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import EventCard from '../components/EventCard'
import CountdownTimer from '../components/CountdownTimer'
import ProgressBar from '../components/ProgressBar'
import { getDeadlineCountdown, recommendEvents } from '../utils/eventUtils'

const ALL_INTERESTS = [
  'AI', 'Machine Learning', 'Web Development', 'UI/UX', 'Cyber Security',
  'Robotics', 'IoT', 'Data Science', 'Blockchain', 'Cloud Computing',
  'DSA', 'System Design', 'Product Management', 'Startup', 'Design',
]

/* ---------------------------------- */

export function StudentAuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  return (
    <section className="section">
      <div className="card" style={{ maxWidth: 440, margin: '0 auto', padding: '2rem' }}>
        <h2 style={{ marginBottom: '0.3rem' }}>{isLogin ? 'Student Login' : 'Create Account'}</h2>
        <p className="muted-text">
          {isLogin
            ? 'Access your saved events, registrations, and personalised recommendations.'
            : 'Join EventSphere to track hackathons, workshops, and competitions across colleges.'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '1.2rem' }}>
          {!isLogin && (
            <>
              <div><p className="field-label">Full Name</p><input placeholder="Varshini C" /></div>
              <div><p className="field-label">College</p><input placeholder="Tech Valley Institute" /></div>
              <div><p className="field-label">Branch</p>
                <select>
                  <option>AI/ML</option><option>CSE</option><option>IT</option>
                  <option>ECE</option><option>EEE</option><option>Mechanical</option>
                </select>
              </div>
            </>
          )}
          <div><p className="field-label">College Email</p><input type="email" placeholder="you@college.edu" /></div>
          <div><p className="field-label">Password</p><input type="password" placeholder="��������" /></div>
          {!isLogin && <div><p className="field-label">Confirm Password</p><input type="password" placeholder="��������" /></div>}
          <button className="btn btn-lg" style={{ marginTop: '0.3rem' }}>
            {isLogin ? 'Login to EventSphere' : 'Create My Account'}
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.88rem', color: 'var(--muted)' }}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setIsLogin(!isLogin)} style={{ border: 'none', background: 'none', color: 'var(--brand)', cursor: 'pointer', fontWeight: 600 }}>
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </section>
  )
}

/* ---------------------------------- */

export function StudentDashboardPage() {
  const { studentProfile, savedEventIds, registeredEventIds, notifications, allEvents } = useApp()
  const [activeTab, setActiveTab] = useState('saved')
  const savedEvents = allEvents.filter((e) => savedEventIds.includes(e.id))
  const registeredEvents = allEvents.filter((e) => registeredEventIds.includes(e.id))
  const recommendedEvents = recommendEvents(allEvents, studentProfile).slice(0, 3)
  const unread = notifications.filter((n) => !n.read).length
  const dashboardEvents = activeTab === 'saved'
    ? savedEvents
    : activeTab === 'registered'
      ? registeredEvents
      : recommendedEvents

  const QUICK_LINKS = [
    { to: '/events', label: 'Explore Events' },
    { to: '/student/saved', label: 'Saved Events' },
    { to: '/student/notifications', label: 'Notifications' },
  ]

  return (
    <section className="section">
      <div className="dashboard-header-row">
        <div className="section-header">
          <h2>My Dashboard</h2>
          <p className="section-sub">Track your events and discover new opportunities.</p>
        </div>
        <Link to="/student/profile" className="btn btn-ghost btn-sm">Settings</Link>
      </div>

      <div className="dashboard-top-grid">
        <article className="card stat-card">
          <h3>{savedEventIds.length}</h3>
          <p>Saved Events</p>
          <div className="stat-mini-icon"><BookOpen size={18} /></div>
        </article>
        <article className="card stat-card">
          <h3>{registeredEventIds.length}</h3>
          <p>Registrations</p>
          <div className="stat-mini-icon"><CheckSquare size={18} /></div>
        </article>
        <article className="card stat-card">
          <h3>{unread}</h3>
          <p>Notifications</p>
          <div className="stat-mini-icon"><Bell size={18} /></div>
        </article>
        <article className="card profile-summary-card">
          <div className="profile-avatar">{studentProfile.name.slice(0, 2).toUpperCase()}</div>
          <div>
            <h3>{studentProfile.name}</h3>
            <p>{studentProfile.branch}</p>
            <p>{studentProfile.college}</p>
          </div>
          <Link to="/student/profile" className="btn btn-ghost btn-sm">Edit Profile</Link>
        </article>
      </div>

      <div className="dashboard-tabs">
        {[
          { key: 'saved', label: 'Saved', count: savedEvents.length, Icon: BookOpen },
          { key: 'registered', label: 'Registered', count: registeredEvents.length, Icon: CheckSquare },
          { key: 'for-you', label: 'For You', count: recommendedEvents.length, Icon: Sparkles },
        ].map(({ key, label, count, Icon }) => (
          <button key={key} className={`dashboard-tab ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>
            <Icon size={15} /> {label} <span>{count}</span>
          </button>
        ))}
      </div>

      <div className="dashboard-main-grid">
        <div className="section">
          <div className="grid-cards event-grid-2">
            {dashboardEvents.map((event) => (
              <EventCard key={event.id} event={event} isSaved={savedEventIds.includes(event.id)} isRegistered={registeredEventIds.includes(event.id)} onToggleSaved={() => {}} onToggleRegistered={() => {}} />
            ))}
          </div>
          {dashboardEvents.length === 0 && <div className="info-box">No events in this section yet.</div>}
        </div>

        <div className="section">
          <div className="card">
            <div className="dashboard-side-header">
              <h3>Notifications</h3>
              <span className="chip chip-dark">{unread}</span>
            </div>
            <div className="simple-notice-list">
              {notifications.slice(0, 3).map((item) => (
                <div key={item.id} className="simple-notice-item">
                  <p>{item.message}</p>
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
            <Link to="/student/notifications" className="btn btn-ghost btn-sm dashboard-side-btn">View All Notifications</Link>
          </div>

          <div className="card">
            <h3>Quick Actions</h3>
            <div className="quick-link-list">
              {QUICK_LINKS.map(({ to, label }) => (
                <Link key={to} to={to} className="quick-link-item">{label}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------- */

export function SavedEventsPage() {
  const { allEvents, savedEventIds, registeredEventIds, toggleSaved, toggleRegistered } = useApp()
  const savedEvents = allEvents.filter((e) => savedEventIds.includes(e.id))

  return (
    <section className="section">
      <div className="section-header">
        <h2>Saved Events</h2>
        <p className="section-sub">
          Events you've bookmarked for later. Saved events stay in this list until you remove
          them � they won't disappear if the deadline passes, so you can review what you
          missed and plan better next semester.
        </p>
      </div>
      {savedEvents.length === 0 ? (
        <div className="info-box">You haven't saved any events yet. <Link to="/events">Explore events ?</Link></div>
      ) : (
        <div className="events-stack">
          {savedEvents.map((event) => (
            <EventCard key={event.id} event={event}
              isSaved={savedEventIds.includes(event.id)}
              isRegistered={registeredEventIds.includes(event.id)}
              onToggleSaved={toggleSaved} onToggleRegistered={toggleRegistered} />
          ))}
        </div>
      )}
    </section>
  )
}

export function RegisteredEventsPage() {
  const { allEvents, registeredEventIds, savedEventIds, toggleSaved, toggleRegistered } = useApp()
  const registeredEvents = allEvents.filter((e) => registeredEventIds.includes(e.id))

  return (
    <section className="section">
      <div className="section-header">
        <h2>Registered Events</h2>
        <p className="section-sub">
          Track every event you've registered for. This section shows registration status, 
          live deadlines, and links back to event details so you can re-check the schedule 
          or submission instructions at any time.
        </p>
      </div>
      {registeredEvents.length === 0 ? (
        <div className="info-box">You haven't marked any registrations yet. <Link to="/events">Find events ?</Link></div>
      ) : (
        <div className="events-stack">
          {registeredEvents.map((event) => (
            <EventCard key={event.id} event={event}
              isSaved={savedEventIds.includes(event.id)}
              isRegistered={registeredEventIds.includes(event.id)}
              onToggleSaved={toggleSaved} onToggleRegistered={toggleRegistered} />
          ))}
        </div>
      )}
    </section>
  )
}

/* ---------------------------------- */

export function RecommendationsPage() {
  const { allEvents, studentProfile, savedEventIds, registeredEventIds, toggleSaved, toggleRegistered } = useApp()
  const [activeInterests, setActiveInterests] = useState([...studentProfile.interests])

  const toggleInterest = (interest) =>
    setActiveInterests((curr) =>
      curr.includes(interest) ? curr.filter((i) => i !== interest) : [...curr, interest],
    )

  const smartSuggestions = useMemo(
    () => recommendEvents(allEvents, { ...studentProfile, interests: activeInterests }).slice(0, 6),
    [allEvents, studentProfile, activeInterests],
  )

  return (
    <section className="section">
      <div className="section-header">
        <p className="eyebrow">Personalized for You</p>
        <h2>Smart Event Recommendations</h2>
      </div>

      {/* ALGORITHM EXPLAINER */}
      <div className="algo-explainer">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Sparkles size={20} color="var(--brand)" />
          <h3 style={{ margin: 0 }}>How the Recommendation Engine Works</h3>
        </div>
        <p className="muted-text" style={{ marginTop: '0.5rem', lineHeight: '1.7' }}>
          EventSphere scores every event against your profile using a weighted multi-factor
          algorithm. Events with the highest total score appear at the top of your feed.
          You can fine-tune the output by toggling interest tags below.
        </p>
        <div className="algo-factors">
          <div className="algo-factor"><strong>+4</strong><p>Branch Match</p></div>
          <div className="algo-factor"><strong>+3</strong><p>Per Interest Match</p></div>
          <div className="algo-factor"><strong>+1</strong><p>Featured Event</p></div>
          <div className="algo-factor"><strong>� Total</strong><p>Match Score</p></div>
        </div>
      </div>

      {/* INTEREST EDITOR */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Pencil size={16} color="var(--brand)" />
          <h3 style={{ margin: 0 }}>Tune Your Interests</h3>
        </div>
        <p className="muted-text">Toggle topics to instantly re-rank recommendations.</p>
        <div className="interest-grid">
          {ALL_INTERESTS.map((interest) => (
            <button
              key={interest}
              className={`interest-chip ${activeInterests.includes(interest) ? 'active' : ''}`}
              onClick={() => toggleInterest(interest)}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      <p className="results-count">
        Showing {smartSuggestions.length} event{smartSuggestions.length !== 1 ? 's' : ''} ranked for {studentProfile.branch} � {activeInterests.length} active interests.
      </p>

      {smartSuggestions.length === 0 ? (
        <div className="info-box">No strong matches found. Try enabling more interests above.</div>
      ) : (
        <div className="events-stack">
          {smartSuggestions.map((event) => (
            <EventCard key={event.id} event={event}
              isSaved={savedEventIds.includes(event.id)}
              isRegistered={registeredEventIds.includes(event.id)}
              onToggleSaved={toggleSaved} onToggleRegistered={toggleRegistered} />
          ))}
        </div>
      )}
    </section>
  )
}

/* ---------------------------------- */

export function NotificationCenterPage() {
  const { notifications, markNotificationRead } = useApp()
  const [filter, setFilter] = useState('all')

  const NOTIF_ICONS = {
    deadline:  { Icon: Clock,    cls: 'notif-type-deadline' },
    'new-event':{ Icon: Lightbulb,cls: 'notif-type-new-event' },
    reminder:  { Icon: Bell,     cls: 'notif-type-reminder' },
  }

  const filtered = filter === 'all' ? notifications : notifications.filter((n) => n.type === filter)
  const unread   = notifications.filter((n) => !n.read).length

  return (
    <section className="section">
      <div className="section-header">
        <h2>Notification Center</h2>
        <p className="section-sub">
          EventSphere delivers three types of automated alerts: <strong>Deadline reminders</strong>
          (triggered 7d / 3d / 24h before cutoff), <strong>New event alerts</strong> (when a new
          event matching your interests is published), and <strong>Reminders</strong> (for events
          you bookmarked but haven't registered for yet).
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div className="notif-filter-bar">
          {['all', 'deadline', 'new-event', 'reminder'].map((type) => (
            <button key={type} className={`tag-pill ${filter === type ? 'active' : ''}`} onClick={() => setFilter(type)}>
              {type === 'all' ? `All (${notifications.length})` : type}
            </button>
          ))}
        </div>
        {unread > 0 && (
          <span className="chip chip-danger">{unread} unread</span>
        )}
      </div>

      <div className="events-stack">
        {filtered.map((n) => {
          const config = NOTIF_ICONS[n.type] ?? NOTIF_ICONS.reminder
          const { Icon, cls } = config
          return (
            <article className={`card notif-card ${n.read ? 'read' : ''}`} key={n.id}>
              <div className={`notif-icon ${cls}`}><Icon size={18} /></div>
              <div style={{ flex: 1 }}>
                <p className="notif-msg">{n.message}</p>
                <p className="notif-time">{new Date(n.createdAt).toLocaleString()}</p>
              </div>
              {!n.read && (
                <button className="btn btn-sm btn-ghost" onClick={() => markNotificationRead(n.id)}>Mark read</button>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}

/* ---------------------------------- */

export function ProfilePage() {
  const { studentProfile } = useApp()
  const [interests, setInterests] = useState([...studentProfile.interests])
  const [saved, setSaved] = useState(false)

  const toggleInterest = (interest) =>
    setInterests((curr) =>
      curr.includes(interest) ? curr.filter((i) => i !== interest) : [...curr, interest],
    )

  return (
    <section className="section">
      <div className="section-header">
        <h2>My Profile</h2>
        <p className="section-sub">
          Your profile drives recommendations and personalises the EventSphere experience.
          Keep your branch and interests updated for the most relevant event suggestions.
        </p>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <div className="profile-form">
          <div>
            <p className="field-label">Full Name</p>
            <input defaultValue={studentProfile.name} />
          </div>
          <div>
            <p className="field-label">College</p>
            <input defaultValue={studentProfile.college} />
          </div>
          <div>
            <p className="field-label">Branch</p>
            <select defaultValue={studentProfile.branch}>
              <option>AI/ML</option><option>CSE</option><option>IT</option>
              <option>ECE</option><option>EEE</option><option>Mechanical</option><option>Civil</option>
            </select>
          </div>
          <div>
            <p className="field-label">Year</p>
            <select defaultValue={studentProfile.year}>
              <option>1st Year</option><option>2nd Year</option>
              <option>3rd Year</option><option>4th Year</option>
            </select>
          </div>
          <div>
            <p className="field-label">College Email</p>
            <input type="email" defaultValue="varshini@techvalley.edu" />
          </div>
          <div>
            <p className="field-label">Phone</p>
            <input type="tel" placeholder="+91 9XXXXXXXXX" />
          </div>
        </div>

        <div>
          <p className="field-label">Interests (used for recommendations)</p>
          <p className="muted-text" style={{ fontSize: '0.84rem', marginBottom: '0.5rem' }}>
            Select every topic you're interested in � the more precise, the better your recommendations.
          </p>
          <div className="interest-grid">
            {ALL_INTERESTS.map((interest) => (
              <button key={interest}
                className={`interest-chip ${interests.includes(interest) ? 'active' : ''}`}
                onClick={() => toggleInterest(interest)}>
                {interest}
              </button>
            ))}
          </div>
        </div>

        <button className="btn" style={{ width: 'fit-content' }} onClick={() => setSaved(true)}>
          {saved ? '? Saved' : 'Save Profile'}
        </button>
        {saved && <p className="muted-text" style={{ fontSize: '0.86rem' }}>Profile changes saved locally. Connect backend to persist.</p>}
      </div>
    </section>
  )
}

/* ---------------------------------- */

export function CertificatesPage() {
  const { allEvents, registeredEventIds } = useApp()
  const completed = allEvents.filter((e) => registeredEventIds.includes(e.id))

  const certId = (eventId) =>
    `ESP-${new Date().getFullYear()}-${eventId.toUpperCase().replace('-', '')}-CERT`

  return (
    <section className="section">
      <div className="section-header">
        <h2>Certificates & Participation History</h2>
        <p className="section-sub">
          EventSphere issues digitally signed participation certificates within 7 working days
          of event completion. Each certificate carries a unique ID verifiable via our
          Certificate Registry. Certificates can be shared directly on LinkedIn.
        </p>
      </div>

      <div className="grid-cards">
        {completed.map((event) => (
          <div key={event.id} className="section" style={{ gap: '0.4rem' }}>
            <div className="cert-card">
              <p className="cert-title">Certificate of Participation</p>
              <hr className="cert-divider" />
              <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>This certifies that</p>
              <p className="cert-name">Varshini C</p>
              <p className="cert-event">{event.title}</p>
              <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>organised by {event.college}</p>
              <hr className="cert-divider" />
              <p className="cert-issued">Issued: EventSphere � April 2026</p>
              <p className="cert-id">ID: {certId(event.id)}</p>
            </div>
            <button className="btn btn-sm" style={{ alignSelf: 'flex-start' }}>
              Download PDF
            </button>
          </div>
        ))}
      </div>

      {completed.length === 0 && (
        <div className="info-box">
          Certificates appear here after you register for and attend an event.
          <Link to="/events"> Explore events ?</Link>
        </div>
      )}
    </section>
  )
}

/* ---------------------------------- */

const TEAM_LISTINGS = [
  { id: 't1', seeking: 'Frontend Developer', event: 'AI Sprint Hackathon 2026', poster: 'Kiran M.', skills: ['React', 'Tailwind', 'REST APIs'], spots: 1, open: true,  desc: 'We need one solid Frontend Dev. Backend and ML roles are filled. Ping before April 8.' },
  { id: 't2', seeking: 'ML Engineer',        event: 'AI Sprint Hackathon 2026', poster: 'Sneha R.', skills: ['Python', 'NLP', 'Model Deployment'], spots: 1, open: true,  desc: 'Looking for someone who can fine-tune an LLM and expose it via FastAPI. Have UI dev and PM.' },
  { id: 't3', seeking: 'UI/UX Designer',     event: 'UI Forge Design Competition', poster: 'Arjun P.', skills: ['Figma', 'UX Research', 'Prototyping'], spots: 2, open: true,  desc: "Two designer slots open. Fresher-friendly. We'll handle all dev; you handle design end-to-end." },
  { id: 't4', seeking: 'Backend Developer',  event: 'CodeStorm National Coding League', poster: 'Meera S.', skills: ['Node.js', 'SQL', 'Docker'], spots: 1, open: false, desc: 'Team is full. Waitlist is open for one reserve slot.' },
]

export function TeamFinderPage() {
  const [skillFilter, setSkillFilter] = useState('')
  const [posted, setPosted] = useState(false)

  const filtered = TEAM_LISTINGS.filter((t) =>
    !skillFilter ||
    t.skills.some((s) => s.toLowerCase().includes(skillFilter.toLowerCase())) ||
    t.seeking.toLowerCase().includes(skillFilter.toLowerCase()),
  )

  return (
    <section className="section">
      <div className="section-header">
        <p className="eyebrow">Collaboration</p>
        <h2>Team Finder</h2>
        <p className="section-sub">
          Solo participants can post open-team requests here, and teams with vacant slots can
          list the roles they're looking for. Match by skill, event, or availability before
          the event registration closes. Collaboration requests are visible to all logged-in
          students.
        </p>
      </div>

      {/* POST A REQUEST FORM */}
      <div className="team-post-form card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.7rem' }}>
          <Users size={18} color="var(--brand)" />
          <h3 style={{ margin: 0 }}>Post a Team Request</h3>
        </div>
        {posted ? (
          <div className="info-box">? Your request was posted successfully! Other students can now find and contact you.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div className="form-row">
              <div><p className="field-label">Role Seeking</p><input placeholder="e.g. ML Engineer" /></div>
              <div><p className="field-label">Event Name</p><input placeholder="e.g. AI Sprint Hackathon" /></div>
            </div>
            <div><p className="field-label">Skills Required</p><input placeholder="Python, TensorFlow, Flask � comma separated" /></div>
            <div><p className="field-label">Description</p><textarea rows="2" placeholder="Describe what you need and what role you play in the team." /></div>
            <button className="btn" style={{ width: 'fit-content' }} onClick={() => setPosted(true)}>
              Post Request
            </button>
          </div>
        )}
      </div>

      {/* FILTER + LISTINGS */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <input
          placeholder="Filter by skill or role�"
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
          style={{ flex: 1, minWidth: 220 }}
        />
        <p className="results-count">{filtered.length} listing{filtered.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="team-listings">
        {filtered.map((t) => (
          <div className="team-card" key={t.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h4 style={{ margin: 0 }}>Seeking: {t.seeking}</h4>
              <span className={t.open ? 'avail-open' : 'avail-full'}>{t.open ? 'Open' : 'Full'}</span>
            </div>
            <p className="muted-text" style={{ fontSize: '0.85rem' }}>
              <strong>Event:</strong> {t.event}
            </p>
            <p style={{ fontSize: '0.88rem', lineHeight: '1.65' }}>{t.desc}</p>
            <div className="skill-tags">
              {t.skills.map((s) => <span key={s} className="skill-tag">{s}</span>)}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.2rem' }}>
              <span className="muted-text" style={{ fontSize: '0.82rem' }}>Posted by {t.poster}</span>
              {t.open && <button className="btn btn-sm">Contact Team</button>}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------------------------------- */

export function MapViewPage() {
  const { allEvents } = useApp()
  const locationGroups = allEvents.reduce((acc, e) => {
    if (!acc[e.location]) acc[e.location] = []
    acc[e.location].push(e)
    return acc
  }, {})

  return (
    <section className="section">
      <div className="section-header">
        <p className="eyebrow">Nearby Discovery</p>
        <h2>Map View</h2>
        <p className="section-sub">
          Find events near your college or city. The interactive map (Google Maps API) will
          show event location pins with popup cards. The geo-grouped list below gives the
          same information without the map integration.
        </p>
      </div>

      <div className="map-placeholder">
        ?? Google Maps embed � requires API key integration in the backend build.
      </div>

      <div className="section-header" style={{ marginTop: '0.5rem' }}>
        <h3>Events by Location</h3>
      </div>
      <div className="grid-cards">
        {Object.entries(locationGroups).map(([location, events]) => (
          <div className="card location-group-card" key={location}>
            <h4><MapPin size={14} style={{ verticalAlign: 'middle' }} /> {location}</h4>
            {events.map((e) => (
              <div className="location-event-item" key={e.id}>
                <Link to={`/events/${e.id}`}>{e.title}</Link>
                <p className="muted-text" style={{ fontSize: '0.8rem', margin: 0 }}>{e.date} � {e.category}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

