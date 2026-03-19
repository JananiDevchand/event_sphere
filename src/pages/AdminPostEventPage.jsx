import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, ArrowLeft, Check } from 'lucide-react'
import { useApp } from '../context/AppContext'

export function AdminPostEventPage() {
  const { postEvent, uploadedEvents } = useApp()
  const navigate = useNavigate()
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    deadline: '',
    location: '',
    category: 'Hackathon',
    collegeId: 'c1',
    branchFocus: [],
    interests: [],
    prizeMoney: '',
    registrationLink: '',
    poster: '',
    featured: false,
  })

  const categories = ['Hackathon', 'Workshop', 'Competition', 'Seminar', 'Coding Event']
  const colleges = [
    { id: 'c1', name: 'Tech Valley Institute' },
    { id: 'c2', name: 'National College of Engineering' },
    { id: 'c3', name: 'Metro Arts and Science College' },
  ]
  const branches = ['AI/ML', 'CSE', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil']
  const interestsList = ['AI', 'Machine Learning', 'Web', 'UI/UX', 'Cyber Security', 'Robotics', 'IoT', 'Data Science', 'Blockchain', 'DSA', 'System Design', 'Product Design']

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleArrayChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: prev[fieldName].includes(value)
        ? prev[fieldName].filter(item => item !== value)
        : [...prev[fieldName], value],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setIsSubmitting(true)

    const result = await postEvent(formData)
    if (!result.success) {
      setErrorMessage(result.message || 'Failed to post event')
      setIsSubmitting(false)
      return
    }

    setSuccessMessage('Event posted successfully!')
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      date: '',
      deadline: '',
      location: '',
      category: 'Hackathon',
      collegeId: 'c1',
      branchFocus: [],
      interests: [],
      prizeMoney: '',
      registrationLink: '',
      poster: '',
      featured: false,
    })

    setTimeout(() => {
      setSuccessMessage('')
    }, 3000)

    setIsSubmitting(false)
  }

  return (
    <section className="section admin-post-event-page">
      <div className="admin-header">
        <button onClick={() => navigate('/')} className="btn btn-ghost btn-sm">
          <ArrowLeft size={16} /> Back to Home
        </button>
        <h2>Post a New Event</h2>
        <p className="admin-subtitle">Create and manage events on EventSphere</p>
      </div>

      {successMessage && (
        <div className="success-alert">
          <Check size={18} />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="error-alert">
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="admin-content-grid">
        {/* Form Section */}
        <div className="admin-form-card">
          <form onSubmit={handleSubmit} className="admin-form">
            {/* Basic Information */}
            <fieldset className="form-section">
              <legend className="form-section-title">Basic Information</legend>
              
              <div className="form-group">
                <label className="form-label">Event Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., AI Sprint Hackathon 2026"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your event..."
                  rows={4}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select name="category" value={formData.category} onChange={handleChange} required>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">College *</label>
                  <select name="collegeId" value={formData.collegeId} onChange={handleChange} required>
                    {colleges.map(college => (
                      <option key={college.id} value={college.id}>{college.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </fieldset>

            {/* Event Details */}
            <fieldset className="form-section">
              <legend className="form-section-title">Event Details</legend>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Event Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Registration Deadline *</label>
                  <input
                    type="datetime-local"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Location *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Chennai, Hybrid, Online"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Prize Money</label>
                  <input
                    type="text"
                    name="prizeMoney"
                    value={formData.prizeMoney}
                    onChange={handleChange}
                    placeholder="e.g., Rs. 1,50,000"
                  />
                </div>
              </div>
            </fieldset>

            {/* Additional Info */}
            <fieldset className="form-section">
              <legend className="form-section-title">Branch & Interest Focus</legend>
              
              <div className="form-group">
                <label className="form-label">Branches</label>
                <div className="checkbox-grid">
                  {branches.map(branch => (
                    <label key={branch} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.branchFocus.includes(branch)}
                        onChange={() => handleArrayChange('branchFocus', branch)}
                      />
                      {branch}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Interests/Skills</label>
                <div className="checkbox-grid">
                  {interestsList.map(interest => (
                    <label key={interest} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={() => handleArrayChange('interests', interest)}
                      />
                      {interest}
                    </label>
                  ))}
                </div>
              </div>
            </fieldset>

            {/* Links & Media */}
            <fieldset className="form-section">
              <legend className="form-section-title">Links & Media</legend>
              
              <div className="form-group">
                <label className="form-label">Registration Link *</label>
                <input
                  type="url"
                  name="registrationLink"
                  value={formData.registrationLink}
                  onChange={handleChange}
                  placeholder="https://..."
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Poster Image URL *</label>
                <input
                  type="url"
                  name="poster"
                  value={formData.poster}
                  onChange={handleChange}
                  placeholder="https://..."
                  required
                />
              </div>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                />
                Featured Event
              </label>
            </fieldset>

            <button type="submit" className="btn btn-submit" disabled={isSubmitting}>
              <Plus size={18} /> {isSubmitting ? 'Posting...' : 'Post Event'}
            </button>
          </form>
        </div>

        {/* Sidebar with Recent Events */}
        <div className="admin-sidebar">
          <div className="card admin-recent-events">
            <h3>Recent Posts ({uploadedEvents.length})</h3>
            {uploadedEvents.length === 0 ? (
              <p className="empty-state">No events posted yet</p>
            ) : (
              <div className="recent-events-list">
                {uploadedEvents.map(event => (
                  <div key={event.id} className="recent-event-item">
                    <h4>{event.title}</h4>
                    <p className="event-meta">{event.date}</p>
                    <span className="event-badge">{event.category}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card admin-quick-tips">
            <h3>Quick Tips</h3>
            <ul>
              <li>Use clear, descriptive titles</li>
              <li>Add a high-quality poster image</li>
              <li>Set realistic deadlines</li>
              <li>Select relevant branches and interests</li>
              <li>Include working registration links</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
