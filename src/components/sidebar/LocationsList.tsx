const locations = ["Riverside Park", "Chen's Apartment", "Victim's Office"];

export function LocationsList() {
  return (
    <div className="mb-6">
      <div className="mb-2 text-xs tracking-wider font-bold text-zinc-500 border-b border-zinc-800 pb-1">
        LOCATIONS
      </div>
      <div className="space-y-1 text-sm">
        {locations.map((location) => (
          <div
            key={location}
            className="p-2 hover:bg-zinc-800 rounded cursor-pointer"
          >
            {location}
          </div>
        ))}
      </div>
    </div>
  );
}
