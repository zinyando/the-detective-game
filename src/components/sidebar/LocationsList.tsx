export interface Location {
  id: string;
  name: string;
  address: string;
  status: string;
  lastVisited: string;
  witnesses: string[];
  notes: string;
}

const locations: Location[] = [
  {
    id: "riverside-corporate",
    name: "Riverside Corporate Center",
    address: "221B River Lane",
    status: "Active Crime Scene",
    lastVisited: "April 18, 2025",
    witnesses: ["Security Guard John Smith", "Janitor Maria Garcia"],
    notes: "Primary crime scene. Security cameras show suspicious activity around 10:45 PM."
  },
  {
    id: "victim-apartment",
    name: "Victim&apos;s Apartment",
    address: "42 Grove Street",
    status: "Secondary Scene",
    lastVisited: "April 17, 2025",
    witnesses: ["Neighbor Diana Wilkins", "Building Manager Tom Chen"],
    notes: "Found victim&apos;s personal diary with concerning entries about business disputes."
  },
  {
    id: "coffee-shop",
    name: "Local Coffee Shop",
    address: "7 Market Square",
    status: "Location of Interest",
    lastVisited: "April 16, 2025",
    witnesses: ["Barista Alex Wong", "Regular Customer Emily Davis"],
    notes: "IP address of threatening email traced to this location. Frequented by Marcus Chen."
  },
];

interface LocationsListProps {
  selectedLocation: string | undefined;
  onSelectLocation: (location: Location) => void;
}

export function LocationsList({ selectedLocation, onSelectLocation }: LocationsListProps) {
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
