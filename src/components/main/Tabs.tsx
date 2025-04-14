interface TabsProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

export function Tabs({ selectedTab, setSelectedTab }: TabsProps) {
  return (
    <div className="flex border-b border-zinc-800">
      {["interview", "evidence", "notes"].map((tab) => (
        <button
          key={tab}
          className={`px-4 py-3 text-sm ${
            selectedTab === tab
              ? "border-b-2 border-amber-500 text-amber-500"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
          onClick={() => setSelectedTab(tab)}
        >
          {tab.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
