export default function Cart({ items, onPlaceOrder, placing }) {
  const total = items.reduce((acc, it) => acc + it.price * it.quantity, 0)
  return (
    <div className="sticky bottom-4 w-full max-w-6xl mx-auto">
      <div className="ml-auto w-full sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-lg p-4">
        <h3 className="font-semibold mb-2">Your Cart</h3>
        <div className="space-y-2 max-h-52 overflow-auto pr-1">
          {items.length === 0 && <p className="text-sm text-slate-500">Your cart is empty.</p>}
          {items.map(it => (
            <div key={it._id} className="flex items-center justify-between text-sm">
              <span className="truncate mr-2">{it.name} × {it.quantity}</span>
              <span className="font-medium">${(it.price * it.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between pt-3 mt-3 border-t">
          <span className="text-sm text-slate-600">Total</span>
          <span className="font-semibold">${total.toFixed(2)}</span>
        </div>
        <button
          disabled={placing || items.length === 0}
          onClick={onPlaceOrder}
          className="mt-3 w-full px-4 py-2 rounded-md bg-emerald-600 text-white font-medium hover:bg-emerald-500 disabled:opacity-60"
        >
          {placing ? 'Placing…' : 'Place Order'}
        </button>
      </div>
    </div>
  )
}
