import { useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { useFetch } from '../hooks/useFetch'
import MenuList from '../components/MenuList'

function MenuPage() {
  const [query, setQuery] = useState('')
  const debounced = useDebounce(query, 400)
  
  // Read API base URL from environment variable per Lab 11 Task 01
  const API = import.meta.env.VITE_API_URL
  const menuUrl = API ? `${API}/api/menu` : '/menu.json'
  const { data: dishes, isLoading, error } = useFetch(menuUrl)

  if (isLoading) return <p>Loading menu…</p>
  if (error) return <p>Could not load menu: {error}</p>

  const filtered = (dishes || []).filter((d) =>
    d.name.toLowerCase().includes(debounced.toLowerCase()),
  )

  return (
    <main className="menu-page">
      <header>
        <h1>CampusEats Dashboard</h1>
        <p>Choose a dish from the menu below.</p>
      </header>

      <div className="search-box">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search dishes..."
          aria-label="Search dishes"
        />
      </div>

      <MenuList dishes={filtered} />
    </main>
  )
}

export default MenuPage
