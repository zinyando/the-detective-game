import { Menu } from "lucide-react";

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
      <a
        href="https://mastra.ai/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400 hover:text-zinc-100 text-sm font-medium transition-all duration-200 border border-zinc-700/50 hover:border-zinc-600/50 group"
      >
        Made with
        <span className="bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent font-semibold group-hover:from-amber-400 group-hover:to-amber-200 transition-all duration-200">
          Mastra
        </span>
      </a>
    </div>
  );
}
