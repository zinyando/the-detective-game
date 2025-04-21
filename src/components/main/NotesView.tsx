"use client";

import { Clock, Users, FileText, AlertCircle } from "lucide-react";
import type { ReactElement } from "react";

interface CaseDetail {
  title: string;
  value: string;
  icon: ReactElement;
}

export function NotesView() {
  const caseDetails: CaseDetail[] = [
    {
      title: "Case Opened",
      value: "April 18, 2025 - 10:30 AM",
      icon: <Clock className="text-amber-500" size={20} />
    },
    {
      title: "Lead Detective",
      value: "Detective Sarah Chen",
      icon: <Users className="text-amber-500" size={20} />
    },
    {
      title: "Case Number",
      value: "2025-0421-MC",
      icon: <FileText className="text-amber-500" size={20} />
    },
    {
      title: "Status",
      value: "Active Investigation",
      icon: <AlertCircle className="text-amber-500" size={20} />
    }
  ];

  return (
    <div className="flex-1 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-medium text-zinc-100 mb-6">Case Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {caseDetails.map((detail) => (
            <div key={detail.title} className="bg-zinc-800 rounded-lg p-4 flex items-start gap-4">
              <div className="p-2 bg-zinc-900 rounded">
                {detail.icon}
              </div>
              <div>
                <div className="text-sm text-zinc-400">{detail.title}</div>
                <div className="text-zinc-100">{detail.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-medium text-zinc-100 mb-4">Case Summary</h2>
            <p className="text-zinc-400 leading-relaxed">
              Investigation into the murder of Marcus Chen, CEO of TechVision Solutions, found deceased in his office on April 18, 2025. 
              Initial findings suggest the incident occurred between 10:30 PM and 11:30 PM. Multiple suspects identified with potential motives.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-zinc-100 mb-4">Key Developments</h2>
            <div className="space-y-4">
              <div className="bg-zinc-800 rounded-lg p-4">
                <div className="text-sm text-zinc-400 mb-1">April 18, 2025 - 14:30</div>
                <div className="text-zinc-100 mb-2">Initial Crime Scene Analysis</div>
                <p className="text-zinc-400 text-sm">Forensics team identified signs of struggle. Security footage from adjacent building shows suspicious activity.</p>
              </div>
              <div className="bg-zinc-800 rounded-lg p-4">
                <div className="text-sm text-zinc-400 mb-1">April 18, 2025 - 16:45</div>
                <div className="text-zinc-100 mb-2">Witness Interviews Initiated</div>
                <p className="text-zinc-400 text-sm">Multiple employees report unusual behavior from victim in days leading up to incident.</p>
              </div>
              <div className="bg-zinc-800 rounded-lg p-4">
                <div className="text-sm text-zinc-400 mb-1">April 18, 2025 - 18:30</div>
                <div className="text-zinc-100 mb-2">Financial Records Review</div>
                <p className="text-zinc-400 text-sm">Discovery of significant company debt and recent large insurance policy purchase.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
