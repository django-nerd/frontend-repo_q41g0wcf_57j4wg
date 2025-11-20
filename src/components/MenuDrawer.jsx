import { useEffect, useState } from 'react'

export default function MenuDrawer({ open, onClose, restaurant, onAdd }) {
  const [items, setItems] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    if (open && restaurant?._id) {
      fetch(`${baseUrl}/restaurants/${restaurant._id}/menu`)
        .then(r => r.json())
        .then(setItems)
        .catch(() => setItems([]))
    }
  }, [open, restaurant])

  if (!open || !restaurant) return null

  return (
    <div className="fixed inset-0 z-30">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl p-5 overflow-y-auto">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">{restaurant.name}</h2>
            <p className="text-sm text-slate-600">Menu</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">Close</button>
        </div>

        <div className="space-y-3">
          {items.map(item => (
            <div key={item._id} className="flex gap-3 border rounded-xl p-3">
              <img src={item.image_url || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd'} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{item.name}</h4>
                  <span className="text-slate-900 font-semibold">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2">{item.description}</p>
                <div className="mt-2 flex justify-end">
                  <button onClick={() => onAdd(item)} className="px-3 py-1.5 text-sm rounded-md bg-slate-900 text-white hover:bg-slate-800">Add</button>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-sm text-slate-500">No items found.</p>
          )}
        </div>
      </div>
    </div>
  )
}
