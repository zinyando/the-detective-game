import { MapPin, Clock, AlertCircle, Users } from "lucide-react";
import { Location } from "../sidebar/LocationsList";

interface LocationViewProps {
  location: Location | null;
}

export function LocationView({ location }: LocationViewProps) {
  if (!location) {
    return (
      <div className="flex-1 flex items-center justify-center text-zinc-500">
        Select a location from the sidebar to view details
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
