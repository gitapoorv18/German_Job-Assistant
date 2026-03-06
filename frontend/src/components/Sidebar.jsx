const TABS = [
  { id: 'Analyze Job', icon: '🔍' },
  { id: 'Match Resume', icon: '📊' },
  { id: 'Cover Letter', icon: '✉️' },
  { id: 'Tracker', icon: '📋' },
];

function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className="w-56 bg-white border-r border-gray-200 p-3 flex flex-col gap-1">
      <p className="text-xs text-gray-400 font-medium px-3 py-2 uppercase tracking-wider">
        Tools
      </p>

      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-3 transition-all ${
            activeTab === tab.id
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
          }`}
        >
          <span className="text-base">{tab.icon}</span>
          {tab.id}
          {activeTab === tab.id && (
            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />
          )}
        </button>
      ))}
    </div>
  );
}

export default Sidebar;
