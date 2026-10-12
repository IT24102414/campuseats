import { useState } from 'react'

function OrderPage() {
  const [form, setForm] = useState({ name: '', email: '', qty: 1 })
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)

  function validate(v) {
    const e = {}
    if (v.name.trim().length < 2) e.name = 'Name too short'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email)) e.email = 'Enter a valid email'
    if (Number(v.qty) < 1) e.qty = 'Qty must be ≥ 1'
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
    setForm({ name: '', email: '', qty: 1 })
    setErrors({})
    setDone(false)
  }

  if (done) {
    return (
      <main className="order-page">
        <section>
          <div>
            <span aria-hidden="true">✓</span>
          </div>
          <h1>Order Confirmed!</h1>
          <p>
            Thank you, {form.name}. Your order for {form.qty} item(s) has been received. A receipt has been sent to {form.email}.
          </p>
          <button type="button" onClick={handleReset}>
            Place Another Order
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="order-page">
      <h1>Place Order</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" value={form.name} onChange={handleChange} />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" value={form.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div>
          <label htmlFor="qty">Quantity</label>
          <input id="qty" name="qty" type="number" min="1" value={form.qty} onChange={handleChange} />
          {errors.qty && <span className="error">{errors.qty}</span>}
        </div>

        <button type="submit">Place order</button>
      </form>
    </main>
  )
}

export default OrderPage
