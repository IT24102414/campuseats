import './App.css'
import { Routes, Route, NavLink, Link } from 'react-router-dom'
import MenuPage from './features/menu/pages/MenuPage'
import DishDetailPage from './features/menu/pages/DishDetailPage'
import OrderPage from './features/menu/pages/OrderPage'

export default function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="brand-section">
          <Link to="/" className="brand">
            <span>🍔</span> CampusEats Dashboard
          </Link>
          <div className="tagline">SLIIT University Canteen Portal · Real-time Online Menu</div>
        </div>

        <div className="header-right">
          <nav className="nav-menu">
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
            >
              Menu
            </NavLink>
            <NavLink
              to="/order"
              className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
            >
              Place Order
            </NavLink>
          </nav>

          <div className="status-badge">
            Status: <strong>Open &amp; Serving</strong>
          </div>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/dish/:id" element={<DishDetailPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="*" element={<p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>404 — Page not found</p>} />
      </Routes>
    </div>
  )
}
