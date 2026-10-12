import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'

function OrderPage() {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const dishParam = searchParams.get('dish') || location.state?.selectedDish || ''

  const [form, setForm] = useState({ name: '', email: '', dish: dishParam || 'Kottu Roti', qty: 1 })
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (dishParam) {
      setForm((prev) => ({ ...prev, dish: dishParam }))
    }
  }, [dishParam])

  function validate(v) {
    const e = {}
    if (v.name.trim().length < 2) e.name = 'Name must be at least 2 characters'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email)) e.email = 'Enter a valid email address'
    if (Number(v.qty) < 1) e.qty = 'Quantity must be ≥ 1'
    return e
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length === 0) setDone(true)
  }

  function handleReset() {
    setForm({ name: '', email: '', dish: 'Kottu Roti', qty: 1 })
    setErrors({})
    setDone(false)
  }

  if (done) {
    return (
      <div className="order-container">
        <div className="order-success-box">
          <div className="success-icon">✓</div>
          <h2>Order Confirmed!</h2>
          <p>
            Thank you, <strong>{form.name}</strong>. Your order for <strong>{form.qty}x {form.dish}</strong> has been received and sent to the campus canteen. A confirmation receipt has been sent to <strong>{form.email}</strong>.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '20px' }}>
            <button className="btn-order" style={{ width: 'auto', padding: '10px 24px' }} type="button" onClick={handleReset}>
              Place Another Order
            </button>
            <Link to="/" className="btn-order" style={{ width: 'auto', padding: '10px 24px', background: '#555' }}>
              Back to Menu
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="order-container">
      <h2 className="order-title">🛒 Place Canteen Order</h2>
      <p className="order-desc">Select your dish and fill in your details for quick canteen pickup.</p>
      
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="dish">Selected Dish</label>
          <input
            id="dish"
            name="dish"
            className="form-input"
            value={form.dish}
            onChange={handleChange}
            placeholder="e.g. Kottu Roti"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="name">Your Name</label>
          <input
            id="name"
            name="name"
            className="form-input"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Theebika Loganathan"
          />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">SLIIT Student Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-input"
            value={form.email}
            onChange={handleChange}
            placeholder="e.g. it24102414@my.sliit.lk"
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="qty">Quantity</label>
          <input
            id="qty"
            name="qty"
            type="number"
            min="1"
            className="form-input"
            value={form.qty}
            onChange={handleChange}
          />
          {errors.qty && <span className="form-error">{errors.qty}</span>}
        </div>

        <button type="submit" className="btn-order" style={{ marginTop: '10px', fontSize: '15px' }}>
          Confirm &amp; Place Order
        </button>
      </form>
    </div>
  )
}

export default OrderPage
