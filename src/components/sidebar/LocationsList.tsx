export interface Location {
  id: string;
  name: string;
  address: string;
  status: string;
  lastVisited: string;
  witnesses: string[];
  notes: string;
}



interface LocationsListProps {
  locations: Location[];
  selectedLocation: string | undefined;
  onSelectLocation: (location: Location) => void;
}

export function LocationsList({ locations, selectedLocation, onSelectLocation }: LocationsListProps) {
  return (
    <div className="mb-6">
      <div className="mb-2 text-xs tracking-wider font-bold text-zinc-500 border-b border-zinc-800 pb-1">
        LOCATIONS
      </div>
      <div className="space-y-1 text-sm">
        {locations.map((location) => (
          <div
            key={location.id}
            onClick={() => onSelectLocation(location)}
            className={`p-2 ${location.id === selectedLocation ? "bg-zinc-800 border-l-2 border-amber-500" : "hover:bg-zinc-800"} rounded cursor-pointer`}
          >
            <div className="text-zinc-300">{location.name}</div>
            <div className="text-xs text-zinc-500">{location.address}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
