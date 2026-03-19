import { Bell, Calendar, Home, Search, User, Rocket, LogOut } from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const topLinks = [
  { to: '/', label: 'Home', Icon: Home },
  { to: '/events', label: 'Explore', Icon: Search },
  { to: '/calendar', label: 'Calendar', Icon: Calendar },
  { to: '/student/dashboard', label: 'My Events', Icon: User },
]

const adminTopLinks = [
  { to: '/', label: 'Home', Icon: Home },
  { to: '/admin/post-event', label: 'Post Event', Icon: Rocket },
]

function Shell() {
  const { notifications, currentUser, logout } = useApp()
  const navigate = useNavigate()
  const unreadCount = notifications.filter((notification) => !notification.read).length

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const linksToDisplay = currentUser?.role === 'admin' ? adminTopLinks : topLinks

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="brand-wrap">
          <div className="brand-icon">
            <Rocket size={18} />
          </div>
          <div>
            <h1>EventSphere</h1>
          </div>
        </div>

        <nav className="primary-nav">
          {linksToDisplay.map(({ to, label, Icon }) => (
            <NavLink key={to} to={to} className="nav-link">
              <Icon size={15} /> {label}
            </NavLink>
          ))}
        </nav>

        <div className="header-quick-actions">
          {currentUser ? (
            <>
              <span className="user-badge">{currentUser.role === 'admin' ? '👨‍💼' : '👤'} {currentUser.email}</span>
              {currentUser.role !== 'admin' && (
                <NavLink to="/student/notifications" className="icon-nav-link" aria-label="Notifications">
                  <Bell size={18} />
                  {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
                </NavLink>
              )}
              <button onClick={handleLogout} className="icon-nav-link logout-btn" aria-label="Logout" title="Logout">
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <NavLink to="/login" className="btn btn-sm">
              Sign In
            </NavLink>
          )}
        </div>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>EventSphere 2026</p>
      </footer>
    </div>
  )
}

export default Shell
