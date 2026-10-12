import DishCard from './DishCard'

function MenuList({ dishes }) {
  if (!dishes.length) return <p>No dishes match your search.</p>

  return (
    <section className="menu-list">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </section>
  )
}

export default MenuList
