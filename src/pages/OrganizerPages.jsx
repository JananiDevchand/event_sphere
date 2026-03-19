import { useState } from 'react'
import { BarChart2, FileText, UploadCloud, Users } from 'lucide-react'
import { useApp } from '../context/AppContext'
import ProgressBar from '../components/ProgressBar'

/* ────────────────────────────────── */

export function OrganizerLoginPage() {
  return (
    <section className="section">
      <div className="card" style={{ maxWidth: 420, margin: '0 auto', padding: '2rem' }}>
        <h2 style={{ marginBottom: '0.3rem' }}>Organizer Login</h2>
        <p className="muted-text">
          Access your event dashboard, participant lists, and analytics. If your college
          isn't registered yet, contact our support team to onboard.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '1.2rem' }}>
          <div><p className="field-label">Organizer Email</p><input type="email" placeholder="events@college.edu" /></div>
          <div><p className="field-label">Password</p><input type="password" placeholder="••••••••" /></div>
          <button className="btn btn-lg" style={{ marginTop: '0.3rem' }}>Login to Dashboard</button>
        </div>
        <p style={{ fontSize: '0.84rem', color: 'var(--muted)', marginTop: '1rem', textAlign: 'center' }}>
          New college? <a href="/contact" style={{ color: 'var(--brand)' }}>Request Onboarding →</a>
        </p>
      </div>
    </section>
  )
}

/* ────────────────────────────────── */

const FORM_STEPS = ['Basic Info', 'Logistics', 'Requirements', 'Review & Publish']

export function CreateEventPage() {
  const [step, setStep] = useState(0)
  const [published, setPublished] = useState(false)
  const [form, setForm] = useState({
    title: '', college: '', category: 'Hackathon', description: '',
    date: '', deadline: '', location: '', mode: 'In-Person',
    prize: '', teamSize: '1-4', slots: '',
    branchFocus: '', registrationLink: '', contactEmail: '',
    eligibility: '', attachments: '',
  })

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  if (published) {
    return (
      <section className="section">
        <div className="card" style={{ textAlign: 'center', padding: '2.5rem' }}>
          <div style={{ fontSize: '3rem' }}>🎉</div>
          <h2>Event Submitted for Review</h2>
          <p className="muted-text">
            Your event "<strong>{form.title}</strong>" has been submitted. Our admin team
            will review and publish it within 24–48 hours. You'll receive an email confirmation.
          </p>
          <button className="btn" style={{ marginTop: '1rem' }} onClick={() => { setPublished(false); setStep(0) }}>
            Create Another Event
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="section">
      <div className="section-header">
        <p className="eyebrow">Organizer Tools</p>
        <h2>Create New Event</h2>
        <p className="section-sub">
          Complete all four steps to submit your event for admin review. Once approved,
          it will appear in the public feed and match student recommendations automatically.
        </p>
      </div>

      <div className="card">
        {/* STEP INDICATOR */}
        <div className="form-steps-bar">
          {FORM_STEPS.map((label, i) => (
            <div key={label} className={`form-step-tab ${i === step ? 'active' : i < step ? 'done' : ''}`}
              onClick={() => i < step && setStep(i)}>
              {i < step ? '✓ ' : ''}{label}
            </div>
          ))}
        </div>

        {/* STEP 1 */}
        {step === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p className="form-section-title">Basic Information</p>
            <div className="form-row">
              <div><p className="field-label">Event Title *</p><input required placeholder="AI Sprint Hackathon 2026" value={form.title} onChange={(e) => set('title', e.target.value)} /></div>
              <div><p className="field-label">Hosting College *</p><input required placeholder="Tech Valley Institute" value={form.college} onChange={(e) => set('college', e.target.value)} /></div>
            </div>
            <div>
              <p className="field-label">Event Category *</p>
              <select value={form.category} onChange={(e) => set('category', e.target.value)}>
                <option>Hackathon</option><option>Workshop</option><option>Competition</option>
                <option>Symposium</option><option>Seminar</option><option>Cultural</option>
              </select>
            </div>
            <div>
              <p className="field-label">Event Description *</p>
              <textarea rows="4" placeholder="Describe the event theme, objectives, and what participants will experience." value={form.description} onChange={(e) => set('description', e.target.value)} style={{ width: '100%' }} />
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p className="form-section-title">Logistics</p>
            <div className="form-row">
              <div><p className="field-label">Event Date *</p><input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} /></div>
              <div><p className="field-label">Registration Deadline *</p><input type="datetime-local" value={form.deadline} onChange={(e) => set('deadline', e.target.value)} /></div>
            </div>
            <div className="form-row">
              <div><p className="field-label">Location / City *</p><input placeholder="Chennai" value={form.location} onChange={(e) => set('location', e.target.value)} /></div>
              <div>
                <p className="field-label">Event Mode</p>
                <select value={form.mode} onChange={(e) => set('mode', e.target.value)}>
                  <option>In-Person</option><option>Hybrid</option><option>Online</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div><p className="field-label">Prize Pool</p><input placeholder="Rs. 1,50,000" value={form.prize} onChange={(e) => set('prize', e.target.value)} /></div>
              <div><p className="field-label">Total Slots</p><input type="number" placeholder="200" value={form.slots} onChange={(e) => set('slots', e.target.value)} /></div>
            </div>
            <div>
              <p className="field-label">Registration Link *</p>
              <input placeholder="https://..." value={form.registrationLink} onChange={(e) => set('registrationLink', e.target.value)} />
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p className="form-section-title">Requirements & Eligibility</p>
            <div className="form-row">
              <div><p className="field-label">Team Size</p>
                <select value={form.teamSize} onChange={(e) => set('teamSize', e.target.value)}>
                  <option>Individual</option><option>1-2</option><option>1-4</option><option>1-6</option>
                </select>
              </div>
              <div><p className="field-label">Eligible Branches</p><input placeholder="CSE, IT, ECE — comma separated" value={form.branchFocus} onChange={(e) => set('branchFocus', e.target.value)} /></div>
            </div>
            <div>
              <p className="field-label">Eligibility Details</p>
              <textarea rows="3" placeholder="Year of study, prerequisites, college attendance requirements, etc." value={form.eligibility} onChange={(e) => set('eligibility', e.target.value)} style={{ width: '100%' }} />
            </div>
            <div><p className="field-label">Contact Email</p><input type="email" placeholder="eventcoordinator@college.edu" value={form.contactEmail} onChange={(e) => set('contactEmail', e.target.value)} /></div>
            <div className="upload-zone">
              <UploadCloud size={28} color="var(--muted)" />
              <p>Drag and drop event poster (JPG/PNG) or brochure (PDF)</p>
              <input type="file" accept="image/*,.pdf" style={{ marginTop: '0.5rem' }} />
            </div>
          </div>
        )}

        {/* STEP 4 – REVIEW */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <p className="form-section-title">Review Before Submission</p>
            <div className="info-grid">
              <div><strong>Title</strong><p>{form.title || '—'}</p></div>
              <div><strong>College</strong><p>{form.college || '—'}</p></div>
              <div><strong>Category</strong><p>{form.category}</p></div>
              <div><strong>Date</strong><p>{form.date || '—'}</p></div>
              <div><strong>Location</strong><p>{form.location || '—'} ({form.mode})</p></div>
              <div><strong>Prize</strong><p>{form.prize || '—'}</p></div>
              <div><strong>Deadline</strong><p>{form.deadline || '—'}</p></div>
              <div><strong>Slots</strong><p>{form.slots || '—'}</p></div>
            </div>
            <div className="info-box">
              Once submitted, our admin team will review your event for quality and accuracy
              before publishing. Approval typically takes 24–48 hours.
            </div>
          </div>
        )}

        {/* NAV BUTTONS */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.2rem' }}>
          {step > 0
            ? <button className="btn btn-ghost" onClick={() => setStep((s) => s - 1)}>← Back</button>
            : <span />}
          {step < FORM_STEPS.length - 1
            ? <button className="btn" onClick={() => setStep((s) => s + 1)}>Continue →</button>
            : <button className="btn" onClick={() => setPublished(true)}>Submit for Review</button>}
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────── */

export function ManageEventsPage() {
  const { allEvents } = useApp()
  const STATUS = ['Live', 'Live', 'Under Review', 'Live', 'Draft', 'Under Review']

  return (
    <section className="section">
      <div className="section-header">
        <h2>Manage Events</h2>
        <p className="section-sub">
          All events posted by your college. Monitor status, edit details, view registrations,
          and take actions before deadlines close.
        </p>
      </div>
      <div className="events-stack">
        {allEvents.map((event, i) => {
          const status   = STATUS[i % STATUS.length]
          const badgeCls = status === 'Live' ? 'chip-success' : status === 'Under Review' ? 'chip-info' : ''
          return (
            <article className="card" key={event.id} style={{ display: 'grid', gridTemplateColumns: '70px 1fr auto', gap: '0.85rem', alignItems: 'center' }}>
              <img src={event.poster} alt={event.title} style={{ width: 70, height: 52, objectFit: 'cover', borderRadius: 10 }} />
              <div>
                <h4 style={{ margin: '0 0 0.2rem' }}>{event.title}</h4>
                <p className="muted-text" style={{ fontSize: '0.85rem' }}>{event.date} · {event.college} · {event.category}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', alignItems: 'flex-end' }}>
                <span className={`chip ${badgeCls}`}>{status}</span>
                <div className="inline-actions">
                  <button className="btn btn-sm btn-secondary">Edit</button>
                  <button className="btn btn-sm btn-ghost">Participants</button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

/* ────────────────────────────────── */

const PARTICIPANTS = [
  { name: 'Aarav N.',   college: 'Tech Valley Inst.',           branch: 'CSE',  year: '3rd', status: 'Confirmed', time: 'Apr 1, 09:12' },
  { name: 'Meera R.',   college: 'NCE, Coimbatore',             branch: 'IT',   year: '2nd', status: 'Pending',   time: 'Apr 1, 11:34' },
  { name: 'Dev P.',     college: 'Metro Arts, Bengaluru',       branch: 'ECE',  year: '4th', status: 'Confirmed', time: 'Apr 2, 08:55' },
  { name: 'Sneha K.',   college: 'Tech Valley Inst.',           branch: 'AI/ML',year: '3rd', status: 'Confirmed', time: 'Apr 2, 14:21' },
  { name: 'Rahul V.',   college: 'PSG College of Technology',   branch: 'CSE',  year: '3rd', status: 'Waitlist',  time: 'Apr 3, 10:07' },
]

export function ParticipantListPage() {
  const [search, setSearch] = useState('')
  const filtered = PARTICIPANTS.filter(
    (p) => !search || [p.name, p.college, p.branch].join(' ').toLowerCase().includes(search.toLowerCase()),
  )
  const confirmed = PARTICIPANTS.filter((p) => p.status === 'Confirmed').length

  return (
    <section className="section">
      <div className="section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users size={20} color="var(--brand)" />
          <h2 style={{ margin: 0 }}>Participant List</h2>
        </div>
        <p className="section-sub">View, search, and export all registered participants for your events.</p>
      </div>

      <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px,1fr))' }}>
        <article className="card stat-card"><h3>{PARTICIPANTS.length}</h3><p>Total Registrations</p></article>
        <article className="card stat-card"><h3>{confirmed}</h3><p>Confirmed</p></article>
        <article className="card stat-card"><h3>{PARTICIPANTS.length - confirmed}</h3><p>Pending / Waitlist</p></article>
        <article className="card stat-card">
          <h3>{Math.round((confirmed / PARTICIPANTS.length) * 100)}%</h3>
          <p>Confirmation Rate</p>
        </article>
      </div>

      <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'center' }}>
        <input placeholder="Search by name, college, or branch…" value={search} onChange={(e) => setSearch(e.target.value)} style={{ flex: 1 }} />
        <button className="btn btn-secondary btn-sm">Export CSV</button>
      </div>

      <div className="card" style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>Name</th><th>College</th><th>Branch</th><th>Year</th><th>Registered</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => {
              const cls = p.status === 'Confirmed' ? 'chip-success' : p.status === 'Pending' ? 'chip' : 'chip-info'
              return (
                <tr key={i}>
                  <td><strong>{p.name}</strong></td>
                  <td>{p.college}</td>
                  <td>{p.branch}</td>
                  <td>{p.year}</td>
                  <td className="muted-text" style={{ fontSize: '0.85rem' }}>{p.time}</td>
                  <td><span className={cls}>{p.status}</span></td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="muted-text" style={{ padding: '0.7rem' }}>No participants match your search.</p>}
      </div>
    </section>
  )
}

/* ────────────────────────────────── */

const DAILY_REGS = [
  { label: 'Apr 1', count: 42, max: 120 },
  { label: 'Apr 2', count: 78, max: 120 },
  { label: 'Apr 3', count: 55, max: 120 },
  { label: 'Apr 4', count: 90, max: 120 },
  { label: 'Apr 5', count: 120, max: 120 },
  { label: 'Apr 6', count: 30, max: 120 },
]

const SOURCE_DATA = [
  { label: 'Direct Link',    pct: 45 },
  { label: 'EventSphere Search', pct: 30 },
  { label: 'Recommendation',pct: 18 },
  { label: 'Notification',  pct: 7 },
]

export function EventAnalyticsPage() {
  return (
    <section className="section">
      <div className="section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BarChart2 size={20} color="var(--brand)" />
          <h2 style={{ margin: 0 }}>Event Analytics</h2>
        </div>
        <p className="section-sub">
          Real-time metrics for your most recent event. Use these insights to optimise
          promotion timing, identify high-conversion channels, and set realistic slot targets.
        </p>
      </div>

      {/* KPI STRIP */}
      <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px,1fr))' }}>
        {[
          { val: '3,420', label: 'Event Page Views' },
          { val: '1,154', label: 'Registrations' },
          { val: '34%',   label: 'Conversion Rate' },
          { val: '4.6 ★', label: 'Avg Event Rating' },
        ].map(({ val, label }) => (
          <article className="card stat-card" key={label}><h3>{val}</h3><p>{label}</p></article>
        ))}
      </div>

      <div className="analytics-two-col">
        {/* DAILY REGISTRATIONS BAR CHART */}
        <div className="card">
          <h3>Daily Registrations</h3>
          <p className="muted-text" style={{ marginBottom: '0.85rem' }}>Registrations received per day across the open window.</p>
          <div className="bar-chart-css">
            {DAILY_REGS.map(({ label, count, max }) => (
              <div className="bar-row-css" key={label}>
                <span className="bar-row-label">{label}</span>
                <div className="bar-row-track">
                  <div className="bar-row-fill" style={{ width: `${Math.round((count / max) * 100)}%`, background: 'var(--brand)' }}>
                    {count > 20 ? count : ''}
                  </div>
                </div>
                <span className="bar-row-count">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SOURCE BREAKDOWN */}
        <div className="card">
          <h3>Traffic Sources</h3>
          <p className="muted-text" style={{ marginBottom: '0.85rem' }}>Where registrants came from.</p>
          {SOURCE_DATA.map(({ label, pct }) => (
            <ProgressBar key={label} label={label} value={pct} max={100} color="var(--accent)" />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────── */

export function EditEventPage() {
  const { allEvents } = useApp()
  const event = allEvents[0] // demo: edit first event

  return (
    <section className="section">
      <div className="section-header">
        <h2>Edit Event: {event.title}</h2>
        <p className="section-sub">
          Update any field before the registration deadline. Changes go live immediately
          after saving — no re-approval required for minor edits.
        </p>
      </div>
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div className="form-row">
          <div><p className="field-label">Event Title</p><input defaultValue={event.title} /></div>
          <div><p className="field-label">Category</p><select defaultValue={event.category}><option>Hackathon</option><option>Workshop</option><option>Competition</option></select></div>
        </div>
        <div><p className="field-label">Description</p><textarea rows="4" defaultValue={event.description} style={{ width: '100%' }} /></div>
        <div className="form-row">
          <div><p className="field-label">Event Date</p><input type="date" defaultValue={event.date} /></div>
          <div><p className="field-label">Registration Deadline</p><input type="datetime-local" defaultValue={event.deadline} /></div>
        </div>
        <div className="form-row">
          <div><p className="field-label">Prize Pool</p><input defaultValue={event.prizeMoney} /></div>
          <div><p className="field-label">Location</p><input defaultValue={event.location} /></div>
        </div>
        <button className="btn" style={{ width: 'fit-content' }}>Save Changes</button>
      </div>
    </section>
  )
}

/* ────────────────────────────────── */

export function UploadAssetsPage() {
  const [files, setFiles] = useState([])

  return (
    <section className="section">
      <div className="section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <UploadCloud size={20} color="var(--brand)" />
          <h2 style={{ margin: 0 }}>Upload Posters & Assets</h2>
        </div>
        <p className="section-sub">
          Upload your event poster, brochure, schedule PDF, and sponsor logos. Supported
          formats: JPG, PNG, PDF, SVG. Maximum file size: 10 MB per file.
          Images are automatically resized and CDN-served for fast loading.
        </p>
      </div>

      <div className="card">
        <p className="form-section-title">Asset Types</p>
        <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(185px, 1fr))', marginBottom: '1rem' }}>
          {['Event Poster', 'Schedule PDF', 'Sponsor Logos', 'Gallery Photos'].map((type) => (
            <div key={type} className="card" style={{ background: 'var(--bg)', textAlign: 'center', padding: '1rem' }}>
              <FileText size={22} color="var(--muted)" />
              <p style={{ margin: '0.4rem 0 0', fontWeight: 500, fontSize: '0.9rem' }}>{type}</p>
            </div>
          ))}
        </div>

        <div className="upload-zone" onClick={() => document.getElementById('fileInput').click()}>
          <UploadCloud size={32} color="var(--muted)" />
          <p><strong>Click to browse</strong> or drag and drop files here</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>JPG, PNG, PDF, SVG — up to 10 MB each</p>
          <input id="fileInput" type="file" accept="image/*,.pdf,.svg" multiple
            style={{ display: 'none' }}
            onChange={(e) => setFiles([...e.target.files])} />
        </div>

        {files.length > 0 && (
          <div style={{ marginTop: '0.75rem' }}>
            <p className="form-section-title">Selected Files</p>
            {[...files].map((f, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid var(--line)', fontSize: '0.88rem' }}>
                <span>{f.name}</span>
                <span className="muted-text">{(f.size / 1024).toFixed(1)} KB</span>
              </div>
            ))}
            <button className="btn" style={{ marginTop: '0.75rem' }}>Upload All Files</button>
          </div>
        )}
      </div>
    </section>
  )
}

