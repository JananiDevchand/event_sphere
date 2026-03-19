import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import Shell from './components/Shell'
import { LoginPage } from './pages/LoginPage'
import { AdminPostEventPage } from './pages/AdminPostEventPage'
import { useApp } from './context/AppContext'
import {
  AboutPage,
  CollegeListPage,
  CompetitionsPage,
  ContactPage,
  EventCalendarPage,
  EventDetailsPage,
  ExploreEventsPage,
  ExploreHackathonsPage,
  FeaturedEventsPage,
  HomePage,
  SearchResultsPage,
  WorkshopsPage,
} from './pages/PublicPages'
import {
  CertificatesPage,
  MapViewPage,
  NotificationCenterPage,
  ProfilePage,
  RecommendationsPage,
  RegisteredEventsPage,
  SavedEventsPage,
  StudentAuthPage,
  StudentDashboardPage,
  TeamFinderPage,
} from './pages/StudentPages'
import {
  CreateEventPage,
  EditEventPage,
  EventAnalyticsPage,
  ManageEventsPage,
  OrganizerLoginPage,
  ParticipantListPage,
  UploadAssetsPage,
} from './pages/OrganizerPages'
import {
  AdminAnalyticsPage,
  AdminDashboardPage,
  ApproveEventsPage,
  AutoScraperPage,
  ManageCollegesPage,
  ManageUsersPage,
  ReportsPage,
} from './pages/AdminPages'

function EventDetailsRoute() {
  const { eventId } = useParams()
  return <EventDetailsPage eventId={eventId} />
}

function RootRoute() {
  const { currentUser } = useApp()
  return currentUser ? <HomePage /> : <Navigate to="/login" replace />
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Shell />}>
        <Route index element={<RootRoute />} />
        <Route path="events" element={<ExploreEventsPage />} />
        <Route path="hackathons" element={<ExploreHackathonsPage />} />
        <Route path="workshops" element={<WorkshopsPage />} />
        <Route path="competitions" element={<CompetitionsPage />} />
        <Route path="calendar" element={<EventCalendarPage />} />
        <Route path="featured" element={<FeaturedEventsPage />} />
        <Route path="colleges" element={<CollegeListPage />} />
        <Route path="events/:eventId" element={<EventDetailsRoute />} />
        <Route path="search" element={<SearchResultsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />

        <Route path="student/auth" element={<StudentAuthPage />} />
        <Route path="student/dashboard" element={<StudentDashboardPage />} />
        <Route path="student/saved" element={<SavedEventsPage />} />
        <Route path="student/registered" element={<RegisteredEventsPage />} />
        <Route path="student/recommendations" element={<RecommendationsPage />} />
        <Route path="student/notifications" element={<NotificationCenterPage />} />
        <Route path="student/profile" element={<ProfilePage />} />
        <Route path="student/certificates" element={<CertificatesPage />} />

        <Route path="organizer/login" element={<OrganizerLoginPage />} />
        <Route path="organizer/create-event" element={<CreateEventPage />} />
        <Route path="organizer/manage-events" element={<ManageEventsPage />} />
        <Route path="organizer/participants" element={<ParticipantListPage />} />
        <Route path="organizer/analytics" element={<EventAnalyticsPage />} />
        <Route path="organizer/edit-event" element={<EditEventPage />} />
        <Route path="organizer/upload" element={<UploadAssetsPage />} />

        <Route path="admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="admin/post-event" element={<AdminPostEventPage />} />
        <Route path="admin/approve-events" element={<ApproveEventsPage />} />
        <Route path="admin/manage-colleges" element={<ManageCollegesPage />} />
        <Route path="admin/manage-users" element={<ManageUsersPage />} />
        <Route path="admin/reports" element={<ReportsPage />} />
        <Route path="admin/analytics" element={<AdminAnalyticsPage />} />
        <Route path="admin/auto-scraper" element={<AutoScraperPage />} />

        <Route path="team-finder" element={<TeamFinderPage />} />
        <Route path="map-view" element={<MapViewPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
