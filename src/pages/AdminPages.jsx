import { useState } from 'react'
import { BarChart2, RefreshCw, CheckCircle, XCircle, AlertTriangle, Users } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'

const ALERTS = [
  { msg: '3 events awaiting approval for more than 48 hours' },
  { msg: 'New college "Sairam Institute" requested onboarding' },
  { msg: 'Scraper returned 0 results from Unstop (last run: 2 h ago)' },
  { msg: 'Student report submitted for AI Sprint event listing' },
]

export function AdminDashboardPage() {
  return (
    <section className="section">
      <div className="section-header">
        <p className="eyebrow">Platform Control</p>
        <h2>Admin Dashboard</h2>
        <p className="section-sub">
          Monitor platform health, manage event approvals, onboard colleges, and track
          engagement metrics across all student and organizer accounts.
        </p>
      </div>

      {/* KPI ROW */}
      <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(145px,1fr))' }}>
        {[
          { val: '12',    label: 'Pending Approvals',  color: '#f2a541', textColor: '#6b3000' },
          { val: '134',   label: 'Active Colleges' },
          { val: '9,870', label: 'Student Users' },
          { val: '6',     label: 'Live Events' },
          { val: '1,154', label: 'Registrations' },
          { val: '98.2%', label: 'Uptime (30 days)' },
        ].map(({ val, label, color, textColor }) => (
          <article className="card stat-card" key={label}
            style={color ? { borderTop: `3px solid ${color}` } : {}}>
            <h3 style={textColor ? { color: textColor } : {}}>{val}</h3>
            <p>{label}</p>
          </article>
        ))}
      </div>

      <div className="admin-dashboard-layout">
        {/* PLATFORM ANALYTICS */}
        <div>
          <div className="card">
            <h3 style={{ marginBottom: '0.85rem' }}>Category Breakdown</h3>
            {[
              { label: 'Hackathon',   pct: 38, color: '#136f63' },
              { label: 'Workshop',    pct: 27, color: '#6b4faa' },
              { label: 'Competition', pct: 18, color: '#b5541a' },
              { label: 'Seminar',     pct: 10, color: '#1a6ab5' },
              { label: 'Cultural',    pct: 7,  color: '#a04eb5' },
            ].map(({ label, pct, color }) => (
              <ProgressBar key={label} label={label} value={pct} max={100} color={color} />
            ))}
          </div>

          <div className="card" style={{ marginTop: '0.75rem' }}>
            <h3 style={{ marginBottom: '0.85rem' }}>Monthly Registrations</h3>
            <div className="bar-chart-css">
              {[
                { label: 'Jan', count: 320, max: 1200 },
                { label: 'Feb', count: 580, max: 1200 },
                { label: 'Mar', count: 890, max: 1200 },
                { label: 'Apr', count: 1154, max: 1200 },
              ].map(({ label, count, max }) => (
                <div className="bar-row-css" key={label}>
                  <span className="bar-row-label">{label}</span>
                  <div className="bar-row-track">
                    <div className="bar-row-fill" style={{ width: `${Math.round((count / max) * 100)}%`, background: 'var(--brand)' }}>
                      {count > 100 ? count : ''}
                    </div>
                  </div>
                  <span className="bar-row-count">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ALERT QUEUE */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <AlertTriangle size={18} color="#b5541a" />
            <h3 style={{ margin: 0 }}>Alerts</h3>
          </div>
          <div className="alert-queue">
            {ALERTS.map((a, i) => (
              <div className="alert-item" key={i}>
                <div className="alert-dot" />
                <p style={{ margin: 0, fontSize: '0.9rem' }}>{a.msg}</p>
              </div>
            ))}
          </div>

          <hr style={{ margin: '1rem 0', borderColor: 'var(--line)' }} />
          <h3 style={{ marginBottom: '0.7rem' }}>Recent Activity</h3>
          <div className="activity-feed">
            {[
              { text: 'AI Sprint Hackathon approved by admin', time: '2 h ago' },
              { text: 'NCE, Coimbatore onboarded as new college', time: '5 h ago' },
              { text: 'Scraper fetched 14 new events from Devpost', time: '8 h ago' },
              { text: 'Cyber Security Workshop rejected (duplicate)', time: '1 d ago' },
              { text: '200 new student sign-ups this week', time: '2 d ago' },
            ].map((item, i) => (
              <div className="feed-item" key={i}>
                <div className="feed-dot" />
                <div>
                  <p>{item.text}</p>
                  <span className="feed-time">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────── */

const PENDING_EVENTS = [
  { id: 1, title: 'IoT Build Challenge', college: 'PSG College', category: 'Hackathon', date: '2026-05-10', poster: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=80&q=60', submittedBy: 'events@psg.edu' },
  { id: 2, title: 'Python Bootcamp',     college: 'CEG, Chennai',   category: 'Workshop',  date: '2026-04-25', poster: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=80&q=60', submittedBy: 'tech@ceg.edu' },
  { id: 3, title: 'Design Blitz 2026',   college: 'NID Alumni',     category: 'Competition', date: '2026-05-02', poster: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&q=60', submittedBy: 'nid@alumni.org' },
]

export function ApproveEventsPage() {
  const [statuses, setStatuses] = useState(() => Object.fromEntries(PENDING_EVENTS.map((e) => [e.id, 'pending'])))
  const [notes, setNotes]       = useState(() => Object.fromEntries(PENDING_EVENTS.map((e) => [e.id, ''])))

  const act = (id, action) => setStatuses((s) => ({ ...s, [id]: action }))

  return (
    <section className="section">
      <div className="section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle size={20} color="var(--brand)" />
          <h2 style={{ margin: 0 }}>Approve Events</h2>
        </div>
        <p className="section-sub">
          Review event submissions from organisers. Verify poster, description, category,
          and registration link before approving for public visibility.
        </p>
      </div>
      <div className="approve-queue">
        {PENDING_EVENTS.map((event) => {
          const status = statuses[event.id]
          return (
            <div className="card approve-event-card" key={event.id}>
              <img src={event.poster} alt={event.title} className="approve-event-thumb" />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                  <h4 style={{ margin: 0 }}>{event.title}</h4>
                  <span className="chip">{event.category}</span>
                  {status !== 'pending' && (
                    <span className={status === 'approved' ? 'chip chip-success' : 'chip chip-danger'}>
                      {status === 'approved' ? '✓ Approved' : '✗ Rejected'}
                    </span>
                  )}
                </div>
                <p className="muted-text" style={{ fontSize: '0.85rem', margin: '0 0 0.35rem' }}>{event.college} · {event.date} · Submitted by {event.submittedBy}</p>
                <textarea
                  placeholder="Review note (required for rejection)…"
                  rows="2"
                  style={{ width: '100%', fontSize: '0.85rem' }}
                  value={notes[event.id]}
                  onChange={(e) => setNotes((n) => ({ ...n, [event.id]: e.target.value }))}
                />
              </div>
              {status === 'pending' && (
                <div className="approve-actions">
                  <button className="btn btn-sm btn-approve" onClick={() => act(event.id, 'approved')}>
                    <CheckCircle size={14} /> Approve
                  </button>
                  <button className="btn btn-sm btn-reject" onClick={() => act(event.id, 'rejected')}>
                    <XCircle size={14} /> Reject
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ────────────────────────────────── */

const COLLEGES_LIST = [
  { name: 'Tech Valley Institute', city: 'Chennai',    events: 4, students: 1240, status: 'Active' },
  { name: 'NCE, Coimbatore',       city: 'Coimbatore', events: 2, students:  870, status: 'Active' },
  { name: 'Metro Arts, Bengaluru', city: 'Bengaluru',  events: 1, students:  460, status: 'Active' },
  { name: 'PSG College of Tech.',  city: 'Coimbatore', events: 0, students:    0, status: 'Pending' },
]

export function ManageCollegesPage() {
  return (
    <section className="section">
      <div className="section-header">
        <h2>Manage Colleges</h2>
        <p className="section-sub">
          Onboard new institutions, update their profiles, assign organiser accounts,
          and monitor listing quality.
        </p>
      </div>
      <button className="btn btn-sm" style={{ marginBottom: '0.75rem' }}>+ Onboard New College</button>
      <div className="card" style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr><th>College</th><th>City</th><th>Events</th><th>Students</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {COLLEGES_LIST.map((c) => (
              <tr key={c.name}>
                <td><strong>{c.name}</strong></td>
                <td>{c.city}</td>
                <td>{c.events}</td>
                <td>{c.students.toLocaleString()}</td>
                <td><span className={c.status === 'Active' ? 'chip chip-success' : 'chip'}>{c.status}</span></td>
                <td><span className="inline-actions"><button className="btn btn-sm btn-secondary">Edit</button><button className="btn btn-sm btn-ghost">Suspend</button></span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

/* ────────────────────────────────── */

const USERS_LIST = [
  { name: 'Kunal Mehta',  role: 'Student',   college: 'Tech Valley', joined: 'Jan 2026', status: 'Active' },
  { name: 'Priya Suresh', role: 'Student',   college: 'NCE',         joined: 'Feb 2026', status: 'Active' },
  { name: 'Devika Iyer',  role: 'Organiser', college: 'Metro Arts',  joined: 'Dec 2025', status: 'Active' },
  { name: 'Rohit Verma',  role: 'Student',   college: 'Tech Valley', joined: 'Mar 2026', status: 'Flagged' },
]

export function ManageUsersPage() {
  const [search, setSearch] = useState('')
  const filtered = USERS_LIST.filter((u) =>
    !search || [u.name, u.role, u.college].join(' ').toLowerCase().includes(search.toLowerCase()),
  )
  return (
    <section className="section">
      <div className="section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users size={20} color="var(--brand)" />
          <h2 style={{ margin: 0 }}>Manage Users</h2>
        </div>
        <p className="section-sub">
          Review student and organiser accounts. Promote trusted students to organiser roles
          and investigate flagged behaviour.
        </p>
      </div>
      <input placeholder="Search by name, role, or college…" value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: '0.75rem', width: '100%', maxWidth: 400 }} />
      <div className="card" style={{ overflowX: 'auto' }}>
        <table>
          <thead><tr><th>Name</th><th>Role</th><th>College</th><th>Joined</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.name}>
                <td><strong>{u.name}</strong></td>
                <td>{u.role}</td>
                <td>{u.college}</td>
                <td className="muted-text">{u.joined}</td>
                <td><span className={u.status === 'Active' ? 'chip chip-success' : 'chip chip-danger'}>{u.status}</span></td>
                <td><span className="inline-actions"><button className="btn btn-sm btn-ghost">View</button><button className="btn btn-sm btn-secondary">Block</button></span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

/* ────────────────────────────────── */

export function ReportsPage() {
  return (
    <section className="section">
      <div className="section-header">
        <h2>Reports</h2>
        <p className="section-sub">
          Generate downloadable PDF and CSV reports for any time period.
        </p>
      </div>
      <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))' }}>
        {[
          { title: 'Monthly Registration Report',  desc: 'Total registrations, confirmed vs pending, top events.' },
          { title: 'College Performance Report',   desc: 'Events hosted, student reach, conversion rates by college.' },
          { title: 'Student Engagement Report',    desc: 'Active students, saved events, recommendation clicks.' },
          { title: 'Scraper Activity Log',         desc: 'Events discovered, duplicates skipped, sources active.' },
        ].map(({ title, desc }) => (
          <div className="card" key={title} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <h4 style={{ margin: 0 }}>{title}</h4>
            <p className="muted-text" style={{ fontSize: '0.88rem', flex: 1 }}>{desc}</p>
            <div className="inline-actions">
              <button className="btn btn-sm">Download PDF</button>
              <button className="btn btn-sm btn-secondary">Export CSV</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ────────────────────────────────── */

export function AdminAnalyticsPage() {
  return (
    <section className="section">
      <div className="section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BarChart2 size={20} color="var(--brand)" />
          <h2 style={{ margin: 0 }}>Platform Analytics</h2>
        </div>
        <p className="section-sub">
          Aggregated engagement metrics, growth trends, and content health indicators.
        </p>
      </div>
      <div className="admin-dashboard-layout">
        <div className="card">
          <h3 style={{ marginBottom: '0.85rem' }}>Event Category Distribution</h3>
          {[
            { label: 'Hackathon',   val: 38, color: '#136f63' },
            { label: 'Workshop',    val: 27, color: '#6b4faa' },
            { label: 'Competition', val: 18, color: '#b5541a' },
            { label: 'Seminar',     val: 10, color: '#1a6ab5' },
            { label: 'Cultural',    val: 7,  color: '#a04eb5' },
          ].map(({ label, val, color }) => (
            <ProgressBar key={label} label={`${label}  (${val}%)`} value={val} max={100} color={color} />
          ))}
        </div>
        <div className="card">
          <h3 style={{ marginBottom: '0.7rem' }}>Top Metrics</h3>
          {[
            { label: 'Most Popular Category', val: 'Hackathon', icon: '🏅' },
            { label: 'Highest Reach City',    val: 'Chennai',   icon: '📍' },
            { label: 'Top Channel',           val: 'In-app Notifications', icon: '🔔' },
            { label: 'Avg. Approval Time',    val: '18 hours',  icon: '⏱' },
            { label: 'Scraper Events/Week',   val: '26 events', icon: '🤖' },
          ].map(({ label, val, icon }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--line)' }}>
              <span style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>{icon} {label}</span>
              <strong style={{ fontSize: '0.9rem' }}>{val}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────── */

const SCRAPER_SOURCES = [
  { name: 'Devpost',   status: 'active',   lastRun: '2 h ago',  events: 11, scraped: 280 },
  { name: 'Unstop',    status: 'active',   lastRun: '2 h ago',  events: 19, scraped: 342 },
  { name: 'Instagram', status: 'active',   lastRun: '4 h ago',  events: 34, scraped: 510 },
  { name: 'LinkedIn',  status: 'inactive', lastRun: '18 h ago', events: 6,  scraped: 88  },
]

export function AutoScraperPage() {
  return (
    <section className="section">
      <div className="section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <RefreshCw size={20} color="var(--brand)" />
          <h2 style={{ margin: 0 }}>Auto Event Scraper</h2>
        </div>
        <p className="section-sub">
          The scraper pipeline runs every 2 hours, fetching event listings from partner
          platforms. Duplicate events are detected using title fuzzy-matching and
          date-location fingerprinting before entering the approval queue.
        </p>
      </div>
      <div className="info-box" style={{ marginBottom: '1rem' }}>
        <strong>How it works:</strong> Each source connector uses a headless browser (Playwright) to
        collect event listings — titles, dates, and descriptions are normalised — duplicates are
        filtered — remaining events enter the organiser approval queue with source attribution.
      </div>
      <div className="scraper-source-grid">
        {SCRAPER_SOURCES.map((src) => (
          <div className="scraper-source-card card" key={src.name}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <h4 style={{ margin: 0 }}>{src.name}</h4>
              <span className={`status-indicator status-${src.status}`}>
                <span className={`status-dot ${src.status}`} />
                {src.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="scraper-stat"><span>Last run</span><span>{src.lastRun}</span></div>
            <div className="scraper-stat"><span>Events this week</span><strong>{src.events}</strong></div>
            <div className="scraper-stat"><span>Total scraped</span><strong>{src.scraped}</strong></div>
            <button className="btn btn-sm btn-secondary" style={{ marginTop: '0.65rem', width: '100%' }}>
              {src.status === 'active' ? 'Run Now' : 'Reconnect'}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

