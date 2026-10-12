import { useParams, Link } from 'react-router-dom'

function DishDetailPage() {
  const { id } = useParams()

  return (
    <div className="dish-detail-container">
      <h2 style={{ fontSize: '20px', color: '#222', marginBottom: '12px' }}>Dish Details #{id}</h2>
      <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px', lineHeight: '1.6' }}>
        Freshly prepared at the SLIIT University main canteen according to strict campus hygiene standards.
      </p>
      <Link to="/" style={{ color: '#e65100', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}>
        ← Back to CampusEats Menu
      </Link>
    </div>
  )
}

export default DishDetailPage
