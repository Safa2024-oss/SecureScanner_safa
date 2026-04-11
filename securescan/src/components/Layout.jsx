import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Code2, 
  Globe, 
  FileText, 
  LogOut, 
  ShieldCheck, 
  ChevronRight,
  Settings
} from 'lucide-react'
import './Layout.css'

export default function Layout({ user, onLogout }) {
  const navigate = useNavigate()

  // Nav is inside the component so it can access user
  const nav = [
    ...(user?.role === 'admin' ? [{ to: '/admin', icon: Settings, label: 'Admin' }] : []),
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/sast', icon: Code2, label: 'Code Scanner' },
    { to: '/dast', icon: Globe, label: 'URL Scanner' },
    { to: '/report', icon: FileText, label: 'Reports' },
  ]

  const handleLogout = () => {
    onLogout()
    navigate('/login')
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <ShieldCheck size={22} strokeWidth={2} />
          <span>StackSafe</span>
        </div>

        <nav className="sidebar-nav">
          <p className="nav-section-label">Menu</p>
          {nav.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Icon size={17} strokeWidth={1.75} />
              <span>{label}</span>
              <ChevronRight size={14} className="nav-arrow" />
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">{user?.name?.charAt(0)}</div>
            <div className="user-meta">
              <span className="user-name">{user?.name}</span>
              <span className="user-email">{user?.email}</span>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout} title="Sign out">
            <LogOut size={16} strokeWidth={1.75} />
          </button>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}