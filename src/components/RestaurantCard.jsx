export default function RestaurantCard({ restaurant, onOpen }) {
  return (
    <button
      onClick={() => onOpen(restaurant)}
      className="text-left bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition overflow-hidden"
    >
      <div className="aspect-[16/9] w-full overflow-hidden">
        <img
          src={restaurant.image_url || 'https://images.unsplash.com/photo-1544025162-d76694265947'}
          alt={restaurant.name}
          className="w-full h-full object-cover hover:scale-105 transition"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-slate-900 truncate">{restaurant.name}</h3>
          <span className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">
            ⭐ {restaurant.rating || 4.5}
          </span>
        </div>
        <p className="text-sm text-slate-600 line-clamp-2">{restaurant.description || 'Tasty meals delivered hot'}</p>
        <div className="mt-3 text-xs text-slate-500">
          {restaurant.cuisine || 'International'} • {restaurant.delivery_time_min || 20}-{restaurant.delivery_time_max || 40} min
        </div>
      </div>
    </button>
  )
}
