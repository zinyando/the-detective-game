import { Location } from "../sidebar/LocationsList";
import { OverviewCard } from "./InterviewOverview";

interface LocationsOverviewProps {
  locations: Location[];
  onSelectLocation: (location: Location) => void;
}

export function LocationsOverview({ locations, onSelectLocation }: LocationsOverviewProps) {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-zinc-100 mb-6">Locations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {locations.map((location) => (
          <OverviewCard
            key={location.id}
            title={location.name}
            subtitle={location.address}
            description={location.description}
            onClick={() => onSelectLocation(location)}
            tags={[
              {
                label: location.status || "Available",
                color: getStatusColor(location.status),
              },
              {
                label: `${location.witnesses.length} Witnesses`,
                color: "bg-blue-900/50 text-blue-300",
              },
            ]}
          />
        ))}
      </div>
    </div>
  );
}

function getStatusColor(status?: string) {
  switch (status?.toLowerCase()) {
    case "restricted":
      return "bg-red-900/50 text-red-300";
    case "under surveillance":
      return "bg-yellow-900/50 text-yellow-300";
    default:
      return "bg-blue-900/50 text-blue-300";
  }
}
