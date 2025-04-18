import { Menu, Clock, AlertTriangle } from "lucide-react";

interface HeaderProps {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
}

export function Header({ showSidebar, setShowSidebar }: HeaderProps) {
  return (
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
  );
}
