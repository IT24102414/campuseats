import { Link } from 'react-router-dom'

function DishCard({ dish }) {
  return (
    <article className="dish-card">
      <h3>{dish.name}</h3>
      <p>Rs. {dish.price.toFixed(2)}</p>
      <p>
        {dish.category} { !dish.available && <span className="sold-out">— Sold out</span> }
      </p>
      <Link to={`/dish/${dish.id}`} className="detail-link">
        View details
      </Link>
    </article>
  )
}

export default DishCard
