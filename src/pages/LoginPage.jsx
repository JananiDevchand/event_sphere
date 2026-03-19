import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail, LogIn, AlertCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useApp()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const result = await login(email, password)

    if (result.success) {
      if (result.role === 'admin') {
        navigate('/admin/post-event')
      } else {
        navigate('/student/dashboard')
      }
    } else {
      setError(result.message || 'Invalid email or password')
    }

    setIsLoading(false)
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-brand-icon">
            <LogIn size={32} />
          </div>
          <h1>EventSphere</h1>
          <p className="login-subtitle">Sign in to your account</p>
        </div>

        <div className="login-demo-info">
          <div className="demo-box">
            <h4>Student Account</h4>
            <p>Email: <code>user@gmail.com</code></p>
            <p>Pass: <code>user@123</code></p>
          </div>
          <div className="demo-box">
            <h4>Admin Account</h4>
            <p>Email: <code>admin@gmail.com</code></p>
            <p>Pass: <code>admin@123</code></p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
          </div>

          {error && (
            <div className="error-alert">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-login"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="login-footer">
          EventSphere © 2026 | Discover events across colleges
        </p>
      </div>

      <div className="login-background" />
    </div>
  )
}
