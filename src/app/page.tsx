"use client";

import { useState } from "react";
import {
  Search,
  FileText,
  User,
  Clock,
  Menu,
  AlertTriangle,
  ChevronRight,
  X,
} from "lucide-react";

export default function ModernNoirUI() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedTab, setSelectedTab] = useState("interview");

  return (
    <div className="flex flex-col h-screen bg-zinc-900 text-zinc-300 font-sans">
      {/* Header */}
      <div className="bg-black p-4 flex justify-between items-center border-b border-zinc-800">
        <div className="flex items-center">
          <button
            className="mr-4 lg:hidden"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <Menu size={20} />
          </button>
          <h1 className="text-xl font-light tracking-wider text-zinc-100">
            <span className="text-amber-500 font-bold">CASE</span> #2187: THE
            RIVERSIDE MURDER
          </h1>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center text-zinc-500">
            <Clock size={16} className="mr-2" />
            <span>APRIL 18 • 14:30</span>
          </div>
          <div className="flex items-center text-amber-500">
            <AlertTriangle size={16} className="mr-2" />
            <span>6 HOURS REMAINING</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        {showSidebar && (
          <div className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search case files..."
                  className="w-full bg-zinc-800 border-none rounded-md p-2 pl-8 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <Search
                  size={16}
                  className="absolute left-2 top-2.5 text-zinc-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4">
              <div className="mb-6">
                <div className="mb-2 text-xs tracking-wider font-bold text-zinc-500 border-b border-zinc-800 pb-1">
                  PERSONS OF INTEREST
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center p-2 hover:bg-zinc-800 rounded cursor-pointer">
                    <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center">
                      <User size={14} />
                    </div>
                    <div className="ml-2">
                      <div>Sarah Reynolds</div>
                      <div className="text-xs text-zinc-500">
                        Victim's Sister
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center p-2 bg-zinc-800 rounded cursor-pointer border-l-2 border-amber-500">
                    <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center">
                      <User size={14} />
                    </div>
                    <div className="ml-2">
                      <div>Marcus Chen</div>
                      <div className="text-xs text-zinc-500">
                        Business Partner
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center p-2 hover:bg-zinc-800 rounded cursor-pointer">
                    <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center">
                      <User size={14} />
                    </div>
                    <div className="ml-2">
                      <div>Diana Wilkins</div>
                      <div className="text-xs text-zinc-500">Neighbor</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="mb-2 text-xs tracking-wider font-bold text-zinc-500 border-b border-zinc-800 pb-1">
                  KEY EVIDENCE
                </div>
                <div className="space-y-1 text-sm">
                  <div className="p-2 hover:bg-zinc-800 rounded cursor-pointer">
                    <div className="text-zinc-300">Security Footage</div>
                    <div className="text-xs text-zinc-500">
                      Parkade Camera #3
                    </div>
                  </div>
                  <div className="p-2 hover:bg-zinc-800 rounded cursor-pointer">
                    <div className="text-zinc-300">Threatening Email</div>
                    <div className="text-xs text-zinc-500">
                      Sent 3 days before murder
                    </div>
                  </div>
                  <div className="p-2 hover:bg-zinc-800 rounded cursor-pointer">
                    <div className="text-zinc-300">Phone Records</div>
                    <div className="text-xs text-zinc-500">
                      Call logs from victim's phone
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="mb-2 text-xs tracking-wider font-bold text-zinc-500 border-b border-zinc-800 pb-1">
                  LOCATIONS
                </div>
                <div className="space-y-1 text-sm">
                  <div className="p-2 hover:bg-zinc-800 rounded cursor-pointer">
                    Riverside Park
                  </div>
                  <div className="p-2 hover:bg-zinc-800 rounded cursor-pointer">
                    Chen's Apartment
                  </div>
                  <div className="p-2 hover:bg-zinc-800 rounded cursor-pointer">
                    Victim's Office
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main content area */}
        <div className="flex-1 flex flex-col bg-zinc-900">
          {/* Tabs */}
          <div className="flex border-b border-zinc-800">
            <button
              className={`px-4 py-3 text-sm ${selectedTab === "interview" ? "border-b-2 border-amber-500 text-amber-500" : "text-zinc-500 hover:text-zinc-300"}`}
              onClick={() => setSelectedTab("interview")}
            >
              INTERVIEW
            </button>
            <button
              className={`px-4 py-3 text-sm ${selectedTab === "evidence" ? "border-b-2 border-amber-500 text-amber-500" : "text-zinc-500 hover:text-zinc-300"}`}
              onClick={() => setSelectedTab("evidence")}
            >
              EVIDENCE
            </button>
            <button
              className={`px-4 py-3 text-sm ${selectedTab === "notes" ? "border-b-2 border-amber-500 text-amber-500" : "text-zinc-500 hover:text-zinc-300"}`}
              onClick={() => setSelectedTab("notes")}
            >
              CASE NOTES
            </button>
          </div>

          {/* Interview content */}
          {selectedTab === "interview" && (
            <div className="flex-1 flex flex-col">
              {/* Character header */}
              <div className="p-4 border-b border-zinc-800 flex items-center">
                <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center">
                  <User size={32} />
                </div>
                <div className="ml-4">
                  <div className="text-lg font-medium text-zinc-100">
                    Marcus Chen
                  </div>
                  <div className="text-sm text-zinc-500">
                    Business Partner of Victim
                  </div>
                  <div className="flex mt-1 text-xs">
                    <div className="bg-zinc-800 rounded-full px-3 py-1 text-amber-500">
                      Mood: Defensive
                    </div>
                    <div className="bg-zinc-800 rounded-full px-3 py-1 ml-2 text-red-500">
                      Trust: Low
                    </div>
                  </div>
                </div>
              </div>

              {/* Conversation */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="mb-6">
                  <div className="text-zinc-500 text-xs mb-1">YOU</div>
                  <div className="bg-zinc-800 rounded-lg p-3">
                    <p>Where were you on the night of the murder, Mr. Chen?</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-zinc-500 text-xs mb-1">MARCUS CHEN</div>
                  <div className="bg-zinc-700 rounded-lg p-3">
                    <p>
                      I was at the office until late. We had a deadline the next
                      day. Check the security logs if you don't believe me.
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-zinc-500 text-xs mb-1">YOU</div>
                  <div className="bg-zinc-800 rounded-lg p-3">
                    <p>
                      The security logs show you left at 8:30pm, but the murder
                      happened at 11pm. Where did you go after?
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-zinc-500 text-xs mb-1">MARCUS CHEN</div>
                  <div className="bg-zinc-700 rounded-lg p-3">
                    <p>
                      I... went to grab dinner. Then straight home. Look, I
                      didn't kill James. We had our differences, but I wouldn't
                      kill him.
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-xs text-amber-500 italic bg-zinc-800 bg-opacity-50 p-2 rounded border-l-2 border-amber-500">
                    Marcus appears nervous when talking about his whereabouts
                    after work. His right hand trembles slightly.
                  </div>
                </div>
              </div>

              {/* Input area */}
              <div className="p-4 border-t border-zinc-800">
                <div className="mb-3 flex flex-wrap gap-2">
                  <button className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-sm hover:bg-zinc-700">
                    Ask about relationship with victim
                  </button>
                  <button className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-sm hover:bg-zinc-700">
                    Present evidence: Threatening email
                  </button>
                  <button className="bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full text-sm hover:bg-zinc-700">
                    Press about alibi
                  </button>
                </div>

                <div className="flex">
                  <input
                    type="text"
                    placeholder="Type your question..."
                    className="flex-1 bg-zinc-800 border-none rounded-l-md p-3 text-zinc-200 focus:outline-none"
                  />
                  <button className="bg-amber-500 text-zinc-900 rounded-r-md px-4 font-medium">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar - Case notes */}
        <div className="w-64 bg-zinc-900 border-l border-zinc-800 overflow-y-auto hidden lg:block">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-xs tracking-wider font-bold text-zinc-500">
                DETECTIVE'S NOTES
              </div>
              <button className="bg-zinc-800 p-1 rounded hover:bg-zinc-700">
                <FileText size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-zinc-800 rounded p-3 text-sm">
                <div className="text-amber-500 font-medium mb-1">
                  Timeline Inconsistency
                </div>
                <p className="text-zinc-400">
                  Marcus left office at 8:30pm but claims to have been working
                  late. Murder occurred at 11pm.
                </p>
              </div>

              <div className="bg-zinc-800 rounded p-3 text-sm">
                <div className="text-amber-500 font-medium mb-1">
                  Financial Motive
                </div>
                <p className="text-zinc-400">
                  Business was struggling. Insurance policy names Marcus as
                  beneficiary.
                </p>
              </div>

              <div className="bg-zinc-800 rounded p-3 text-sm">
                <div className="text-amber-500 font-medium mb-1">
                  Behavioral Observation
                </div>
                <p className="text-zinc-400">
                  Shows signs of nervousness when discussing alibi. Possible
                  deception.
                </p>
              </div>

              <div className="bg-zinc-800 rounded p-3 text-sm">
                <div className="text-amber-500 font-medium mb-1">
                  Witness Statement
                </div>
                <p className="text-zinc-400">
                  Diana claims to have seen Marcus near the park at 10:30pm.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
