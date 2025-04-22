import { MapPin, Clock, AlertCircle, Users } from "lucide-react";
import { Location } from "../sidebar/LocationsList";
import { LocationsOverview } from "./LocationsOverview";

interface LocationViewProps {
  location: Location | null;
  locations: Location[];
  onSelectLocation: (location: Location) => void;
}

export function LocationView({ location, locations, onSelectLocation }: LocationViewProps) {
  if (!location) {
    return (
      <div className="detective-assistant-ui h-full w-full flex flex-col bg-zinc-900 overflow-auto">
        <LocationsOverview locations={locations} onSelectLocation={onSelectLocation} />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-medium text-zinc-100 mb-2">
          {location.name}
        </h2>
        <div className="text-sm text-zinc-400">{location.address}</div>
      </div>

      <div className="bg-zinc-800 rounded-lg p-6 mb-6">
        <div className="flex items-start mb-6">
          <AlertCircle className="text-amber-500 mt-1 mr-3" size={20} />
          <div>
            <div className="text-sm font-medium text-zinc-300 mb-2">Status</div>
            <div className="text-sm text-zinc-400">{location.status}</div>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <Clock className="text-amber-500 mr-3" size={20} />
          <div>
            <div className="text-sm font-medium text-zinc-300 mb-1">
              Last Visited
            </div>
            <div className="text-sm text-zinc-400">{location.lastVisited}</div>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <Users className="text-amber-500 mr-3" size={20} />
          <div>
            <div className="text-sm font-medium text-zinc-300 mb-1">
              Key Witnesses
            </div>
            <div className="text-sm text-zinc-400">
              {location.witnesses.join(", ")}
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <MapPin className="text-amber-500 mr-3" size={20} />
          <div>
            <div className="text-sm font-medium text-zinc-300 mb-1">Notes</div>
            <div className="text-sm text-zinc-400">{location.notes}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
