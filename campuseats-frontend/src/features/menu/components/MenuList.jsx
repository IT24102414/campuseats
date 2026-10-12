import DishCard from './DishCard'

function MenuList({ dishes }) {
  if (!dishes || dishes.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
        No dishes match your search.
      </div>
    )
  }

  return (
    <div className="dishes-grid">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </div>
  )
}

export default MenuList
