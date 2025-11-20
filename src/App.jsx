import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import RestaurantCard from './components/RestaurantCard'
import MenuDrawer from './components/MenuDrawer'
import Cart from './components/Cart'

function App() {
  const [restaurants, setRestaurants] = useState([])
  const [openResto, setOpenResto] = useState(null)
  const [cart, setCart] = useState([])
  const [seeding, setSeeding] = useState(false)
  const [placing, setPlacing] = useState(false)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const loadRestaurants = async () => {
    const res = await fetch(`${baseUrl}/restaurants`)
    const data = await res.json()
    setRestaurants(data)
  }

  useEffect(() => {
    loadRestaurants()
  }, [])

  const seedDemo = async () => {
    try {
      setSeeding(true)
      await fetch(`${baseUrl}/seed`, { method: 'POST' })
      await loadRestaurants()
    } finally {
      setSeeding(false)
    }
  }

  const handleAddToCart = (item) => {
    setCart(prev => {
      const idx = prev.findIndex(i => i._id === item._id)
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + 1 }
        return copy
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const placeOrder = async () => {
    if (cart.length === 0 || !openResto) return
    setPlacing(true)
    try {
      const payload = {
        customer_name: 'Guest User',
        customer_phone: '0000000000',
        delivery_address: '123 Demo Street',
        restaurant_id: openResto._id,
        items: cart.map(c => ({ menu_item_id: c._id, quantity: c.quantity })),
        notes: 'Leave at the door'
      }
      const res = await fetch(`${baseUrl}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (res.ok) {
        alert(`Order placed! ID: ${data.order_id}`)
        setCart([])
      } else {
        alert(data.detail || 'Failed to place order')
      }
    } catch (e) {
      alert('Error placing order')
    } finally {
      setPlacing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-rose-50">
      <Navbar onSeed={seedDemo} seeding={seeding} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <h2 className="text-2xl font-bold mb-4">Popular near you</h2>
        {restaurants.length === 0 && (
          <div className="bg-white p-6 rounded-xl border text-slate-700">
            No restaurants yet. Use the button at the top to seed demo data.
          </div>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map(r => (
            <RestaurantCard key={r._id} restaurant={r} onOpen={setOpenResto} />)
          )}
        </div>

        <div className="h-24" />
      </main>

      <div className="fixed bottom-4 left-0 right-0 px-4">
        <Cart items={cart} onPlaceOrder={placeOrder} placing={placing} />
      </div>

      <MenuDrawer
        open={!!openResto}
        restaurant={openResto}
        onClose={() => setOpenResto(null)}
        onAdd={handleAddToCart}
      />
    </div>
  )
}

export default App
