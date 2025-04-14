import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="p-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search case files..."
          className="w-full bg-zinc-800 border-none rounded-md p-2 pl-8 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
        <Search size={16} className="absolute left-2 top-2.5 text-zinc-500" />
      </div>
    </div>
  );
}
