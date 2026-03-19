import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { colleges, demoStudent, events, notificationsSeed } from '../data/mockData'
import { enrichEvents } from '../utils/eventUtils'

const AppContext = createContext(null)

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api').replace(/\/$/, '')

export function AppProvider({ children }) {
  const baseEvents = useMemo(() => enrichEvents(events, colleges), [])
  const [savedEventIds, setSavedEventIds] = useState(['e1', 'e4'])
  const [registeredEventIds, setRegisteredEventIds] = useState(['e2'])
  const [notifications, setNotifications] = useState(notificationsSeed)
  const [currentUser, setCurrentUser] = useState(null)
  const [authToken, setAuthToken] = useState('')
  const [uploadedEvents, setUploadedEvents] = useState([])
  const [eventsError, setEventsError] = useState('')

  const allEvents = useMemo(() => [...baseEvents, ...uploadedEvents], [baseEvents, uploadedEvents])

  const fetchUploadedEvents = useCallback(async () => {
    try {
      setEventsError('')
      const response = await fetch(`${API_BASE_URL}/events/`)
      if (!response.ok) {
        throw new Error(`Failed to fetch events (${response.status})`)
      }

      const fetchedEvents = await response.json()
      const enrichedFetchedEvents = enrichEvents(
        fetchedEvents.map((event) => {
          if (event.college) {
            return event
          }

          const selectedCollege = colleges.find((college) => college.id === event.collegeId)
          return {
            ...event,
            college: selectedCollege?.name ?? 'Admin Posted',
          }
        }),
        colleges,
      )
      setUploadedEvents(enrichedFetchedEvents)
    } catch (error) {
      setEventsError(error.message || 'Failed to load events')
    }
  }, [])

  useEffect(() => {
    fetchUploadedEvents()
  }, [fetchUploadedEvents])

  const toggleSaved = (eventId) => {
    setSavedEventIds((current) =>
      current.includes(eventId)
        ? current.filter((id) => id !== eventId)
        : [...current, eventId],
    )
  }

  const toggleRegistered = (eventId) => {
    setRegisteredEventIds((current) =>
      current.includes(eventId)
        ? current.filter((id) => id !== eventId)
        : [...current, eventId],
    )
  }

  const markNotificationRead = (notificationId) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification,
      ),
    )
  }

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      if (!response.ok || !data.success) {
        return {
          success: false,
          message: data.message || 'Invalid email or password',
        }
      }

      setCurrentUser({ email: data.email, role: data.role })
      setAuthToken(data.token || '')
      return { success: true, role: data.role }
    } catch {
      return {
        success: false,
        message: 'Unable to connect to server. Please check backend.',
      }
    }
  }

  const logout = () => {
    setCurrentUser(null)
    setAuthToken('')
  }

  const postEvent = async (eventData) => {
    if (!currentUser || currentUser.role !== 'admin') {
      return { success: false, message: 'Admin login required' }
    }

    const selectedCollege = colleges.find((college) => college.id === eventData.collegeId)
    const payload = {
      ...eventData,
      college: selectedCollege?.name ?? 'Admin Posted',
    }

    try {
      const response = await fetch(`${API_BASE_URL}/events/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      if (!response.ok) {
        return {
          success: false,
          message: data.message || `Failed to post event (${response.status})`,
        }
      }

      const enrichedEvent = enrichEvents([data], colleges)[0]
      setUploadedEvents((prev) => [enrichedEvent, ...prev])
      return { success: true, event: enrichedEvent }
    } catch {
      return {
        success: false,
        message: 'Unable to connect to server. Please check backend.',
      }
    }
  }

  const contextValue = {
    allEvents,
    colleges,
    studentProfile: demoStudent,
    savedEventIds,
    registeredEventIds,
    notifications,
    toggleSaved,
    toggleRegistered,
    markNotificationRead,
    currentUser,
    login,
    logout,
    postEvent,
    uploadedEvents,
    fetchUploadedEvents,
    eventsError,
  }

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }

  return context
}
