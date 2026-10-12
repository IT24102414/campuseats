import { useParams, Link } from 'react-router-dom'

function DishDetailPage() {
  const { id } = useParams()

  return (
    <main className="detail-page">
      <p>Showing details for dish #{id}</p>
      <Link to="/">← Back to menu</Link>
    </main>
  )
}

export default DishDetailPage
