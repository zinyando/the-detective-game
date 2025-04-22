import { FileText, Calendar, MapPin } from "lucide-react";
import { Evidence } from "../sidebar/EvidenceList";

interface EvidenceViewProps {
  evidence: Evidence | null;
}

export function EvidenceView({ evidence }: EvidenceViewProps) {
  if (!evidence) {
    return (
      <div className="flex-1 flex items-center justify-center text-zinc-500">
        Select evidence from the sidebar to view details
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-medium text-zinc-100 mb-2">
          {evidence.title}
        </h2>
        <div className="text-sm text-zinc-400">{evidence.description}</div>
      </div>

      <div className="bg-zinc-800 rounded-lg p-6 mb-6">
        <div className="flex items-start mb-6">
          <FileText className="text-amber-500 mt-1 mr-3" size={20} />
          <div>
            <div className="text-sm font-medium text-zinc-300 mb-2">
              Details
            </div>
            <div className="text-sm text-zinc-400">{evidence.details}</div>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <Calendar className="text-amber-500 mr-3" size={20} />
          <div>
            <div className="text-sm font-medium text-zinc-300 mb-1">
              Date Found
            </div>
            <div className="text-sm text-zinc-400">{evidence.dateFound}</div>
          </div>
        </div>

        <div className="flex items-center">
          <MapPin className="text-amber-500 mr-3" size={20} />
          <div>
            <div className="text-sm font-medium text-zinc-300 mb-1">
              Location
            </div>
            <div className="text-sm text-zinc-400">{evidence.location}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
