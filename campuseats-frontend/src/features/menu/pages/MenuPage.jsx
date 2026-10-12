import { useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { useFetch } from '../hooks/useFetch'
import MenuList from '../components/MenuList'

function MenuPage() {
  const [query, setQuery] = useState('')
  const debounced = useDebounce(query, 300)

  // Read API base URL from environment variable per Lab 11 Task 01
  const API = import.meta.env.VITE_API_URL
  const menuUrl = (API && !API.includes('onrender.com')) ? `${API}/api/menu` : '/api/menu'
  const { data: dishes, isLoading, error } = useFetch(menuUrl)

  const filtered = (dishes || []).filter((d) =>
    d.name.toLowerCase().includes(debounced.toLowerCase()) ||
    (d.category && d.category.toLowerCase().includes(debounced.toLowerCase()))
  )

  return (
    <main className="menu-page">
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search dishes (e.g., Kottu, Rice, Dessert)..."
          aria-label="Search dishes"
        />
      </div>

      {isLoading && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#e65100', fontWeight: '600' }}>
          Loading menu dishes from API...
        </div>
      )}

      {error && !dishes && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#d32f2f' }}>
          Could not load menu: {error}
        </div>
      )}

      {!isLoading && <MenuList dishes={filtered} />}
    </main>
  )
}

export default MenuPage
