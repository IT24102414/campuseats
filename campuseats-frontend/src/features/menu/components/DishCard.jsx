import { useNavigate } from 'react-router-dom'

function DishCard({ dish }) {
  const navigate = useNavigate()

  const handleOrder = () => {
    navigate(`/order?dish=${encodeURIComponent(dish.name)}`, {
      state: { selectedDish: dish.name }
    })
  }

  return (
    <div className="dish-card">
      <div className="dish-category">{dish.category || 'Mains'}</div>
      <div className="dish-name">{dish.name}</div>
      <span className={`badge-status ${dish.available ? 'badge-avail' : 'badge-unavail'}`}>
        ● {dish.available ? 'Available' : 'Sold Out'}
      </span>
      <div className="dish-price">Rs. {Number(dish.price).toFixed(2)}</div>
      <button
        className={`btn-order ${!dish.available ? 'disabled' : ''}`}
        disabled={!dish.available}
        onClick={handleOrder}
      >
        {dish.available ? 'Add to Order' : 'Sold Out'}
      </button>
    </div>
  )
}

export default DishCard
