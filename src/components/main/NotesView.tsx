"use client";

export function NotesView() {
  return (
    <div className="flex-1 p-6 overflow-auto" style={{ maxHeight: "100vh" }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-amber-500 mb-2 tracking-wide">
          THE RIVERSIDE MURDER
        </h1>
        <h2 className="text-xl font-semibold text-zinc-100 mb-8">Case Notes</h2>

        {/* Case Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-zinc-800 rounded-lg p-4 flex items-center gap-4 shadow-md">
            <span className="p-2 bg-zinc-900 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-amber-500"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <div>
              <div className="text-sm text-zinc-400">Case Opened</div>
              <div className="text-zinc-100">April 18, 2025 - 10:30 AM</div>
            </div>
          </div>
          <div className="bg-zinc-800 rounded-lg p-4 flex items-center gap-4 shadow-md">
            <span className="p-2 bg-zinc-900 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-amber-500"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-2A4 4 0 0012 7a4 4 0 00-4 4m8 0a4 4 0 01-8 0"
                />
              </svg>
            </span>
            <div>
              <div className="text-sm text-zinc-400">Lead Detective</div>
              <div className="text-zinc-100">
                Detective Alex Morgan (Player Character)
              </div>
            </div>
          </div>
          <div className="bg-zinc-800 rounded-lg p-4 flex items-center gap-4 shadow-md">
            <span className="p-2 bg-zinc-900 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-amber-500"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 0a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2m-6 0h6"
                />
              </svg>
            </span>
            <div>
              <div className="text-sm text-zinc-400">Case Number</div>
              <div className="text-zinc-100">2025-0421-MR</div>
            </div>
          </div>
          <div className="bg-zinc-800 rounded-lg p-4 flex items-center gap-4 shadow-md">
            <span className="p-2 bg-zinc-900 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-amber-500"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <div>
              <div className="text-sm text-zinc-400">Status</div>
              <div className="text-zinc-100">Active Investigation</div>
            </div>
          </div>
        </div>

        {/* Victim Profile */}
        <section className="mb-10">
          <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6 shadow flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-amber-400 mb-3 tracking-wide">
                Victim Profile
              </h3>
              <div className="space-y-1 text-zinc-300">
                <div>
                  <span className="font-semibold">Name:</span> Michael Reynolds
                </div>
                <div>
                  <span className="font-semibold">Age:</span> 42
                </div>
                <div>
                  <span className="font-semibold">Occupation:</span> CEO and
                  Co-Founder, TechVision Solutions
                </div>
                <div>
                  <span className="font-semibold">Discovered:</span> April 18,
                  2025, 8:45 AM by janitor Maria Garcia
                </div>
                <div>
                  <span className="font-semibold">Cause of Death:</span> Single
                  stab wound to the chest with a letter opener
                </div>
                <div>
                  <span className="font-semibold">Time of Death:</span> Between
                  10:30 PM and 11:30 PM, April 17, 2025
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Initial Briefing */}
        <section className="mb-10">
          <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6 shadow">
            <h3 className="text-lg font-semibold text-amber-400 mb-3 tracking-wide">
              Initial Briefing
            </h3>
            <p className="text-zinc-400 leading-relaxed">
              You&apos;ve been assigned to investigate the murder of Michael
              Reynolds, found dead in his office at Riverside Corporate Center.
              Initial evidence suggests his business partner, Marcus Chen, may
              be involved. Security footage shows someone matching his build
              doesn&apos;t entering the building around the estimated time of
              death, and threatening emails were traced to a coffee shop Marcus
              frequented.
            </p>
            <p className="text-zinc-400 leading-relaxed mt-2">
              The victim&apos;s sister, Sarah Reynolds, stands to benefit
              financially from his death through a recently updated life
              insurance policy. A neighbor, Diana Wilkins&apos;s, has provided
              helpful information but seems unusually nervous during interviews.
            </p>
          </div>
        </section>

        {/* Investigation Progress */}
        <section className="mb-10">
          <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6 shadow">
            <h3 className="text-lg font-semibold text-amber-400 mb-3 tracking-wide">
              Investigation Progress
            </h3>
            <ul className="list-disc pl-6 text-zinc-300 space-y-1">
              <li>Crime scene examined and initial evidence collected</li>
              <li>
                Preliminary interviews conducted with Marcus Chen and Sarah
                Reynolds
              </li>
              <li>
                Access to security footage from Riverside Corporate Center
              </li>
              <li>Discovery of threatening email on victim&apos;s laptop</li>
              <li>
                Phone records obtained showing calls between victim and Marcus
                Chen on night of murder
              </li>
            </ul>
          </div>
        </section>

        {/* Current Objectives */}
        <section className="mb-10">
          <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6 shadow">
            <h3 className="text-lg font-semibold text-amber-400 mb-3 tracking-wide">
              Current Objectives
            </h3>
            <ol className="list-decimal pl-6 text-zinc-300 space-y-1">
              <li>
                Analyze security footage to confirm identity of person entering
                building
              </li>
              <li>
                Interview Diana Wilkins&apos;s, neighbor who claimed to hear an
                argument the night of the murder
              </li>
              <li>Investigate IP address origin at local coffee shop</li>
              <li>
                Review victim&apos;s personal records and financial situation
              </li>
              <li>Check building access logs for the night of the murder</li>
            </ol>
          </div>
        </section>

        {/* Case Board Status */}
        <section className="mb-10">
          <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6 shadow">
            <h3 className="text-lg font-semibold text-amber-400 mb-3 tracking-wide">
              Case Board Status
            </h3>
            <div className="mb-4">
              <div className="text-amber-400 font-semibold">
                Primary Suspect: Marcus Chen (Business Partner)
              </div>
              <ul className="list-disc pl-6 text-zinc-300">
                <li>
                  <span className="font-semibold">Motive:</span> Would gain
                  control of company patents; recent business disputes
                </li>
                <li>
                  <span className="font-semibold">Evidence:</span> Security
                  footage shows similar build; threatening email traced to
                  frequented coffee shop
                </li>
                <li>
                  <span className="font-semibold">Alibi:</span> Claims to have
                  been working at another location
                </li>
              </ul>
            </div>
            <div className="mb-4">
              <div className="text-amber-300 font-semibold">
                Person of Interest: Sarah Reynolds (Victim&apos;s Sister)
              </div>
              <ul className="list-disc pl-6 text-zinc-300">
                <li>
                  <span className="font-semibold">Motive:</span> Recently named
                  beneficiary of $2 million life insurance policy
                </li>
                <li>
                  <span className="font-semibold">Alibi:</span> Claims to have
                  been home alone
                </li>
                <li>
                  <span className="font-semibold">Notes:</span> Appears
                  genuinely distraught; financial records show significant debt
                </li>
              </ul>
            </div>
            <div>
              <div className="text-amber-200 font-semibold">
                Witness: Diana Wilkins&apos;s (Neighbor)
              </div>
              <ul className="list-disc pl-6 text-zinc-300">
                <li>
                  <span className="font-semibold">Initial statement:</span>{" "}
                  Heard argument from victim&apos;s apartment night of murder
                </li>
                <li>
                  <span className="font-semibold">Behavior:</span> Unusually
                  helpful but noticeably nervous during interview
                </li>
                <li>
                  <span className="font-semibold">Notes:</span> Recently moved
                  into apartment adjacent to victim&apos;s
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Detective&apos;s Insights */}
        <section className="mb-10">
          <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6 shadow">
            <h3 className="text-lg font-semibold text-amber-400 mb-3 tracking-wide">
              Detective&apos;s Insights
            </h3>
            <p className="text-zinc-400 leading-relaxed">
              The case against Marcus Chen seems straightforward - perhaps too
              straightforward. The threatening email and security footage make
              him an obvious suspect, but several details don&apos;t align. The
              victim&apos;s personal diary suggests complicated relationships
              with multiple individuals. Building security is sophisticated,
              requiring keycard access after hours.
            </p>
            <p className="text-zinc-400 leading-relaxed mt-2">
              The nervous behavior of Diana Wilkins&apos;s warrants closer
              examination. Her apartment&apos;s proximity to the victim&apos;s
              could be significant. The coffee shop connection requires further
              investigation - who exactly sent that email?
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
