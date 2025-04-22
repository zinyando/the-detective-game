"use client";



interface GameIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GameIntroModal({ isOpen, onClose }: GameIntroModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-800 p-6 rounded-lg max-w-2xl w-full mx-4 space-y-6">
        <h2 className="text-2xl font-bold text-amber-500">Welcome Detective!</h2>
        
        <div className="space-y-4 text-zinc-300">
          <p className="leading-relaxed">
            You&apos;ve been assigned to investigate the murder of Marcus Chen, CEO of TechVision Solutions. 
            Your mission is to uncover the truth behind this mysterious case.
          </p>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-amber-400">How to Play:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Use the <span className="text-amber-400">Interview</span> tab to question suspects and witnesses</li>
              <li>Examine <span className="text-amber-400">Evidence</span> collected from the crime scene</li>
              <li>Visit key <span className="text-amber-400">Locations</span> to gather more clues</li>
              <li>Take <span className="text-amber-400">Notes</span> to keep track of important information</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-amber-400">Key Features:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Click on tabs to switch between different investigation modes</li>
              <li>Use the notes section to record your findings and theories</li>
              <li>Review evidence and testimonies to spot inconsistencies</li>
              <li>Connect the dots to solve the case</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4 mt-6">
          <div className="mt-8">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-medium rounded-md transition-colors"
            >
              Begin Investigation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
