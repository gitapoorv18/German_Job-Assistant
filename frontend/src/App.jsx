import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AnalyzeJob from './pages/AnalyzeJob';
import MatchResume from './pages/MatchResume';
import CoverLetter from './pages/CoverLetter';
import Tracker from './pages/Tracker';

function App() {
  const [activeTab, setActiveTab] = useState('Analyze Job');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (activeTab) {
      case 'Analyze Job':
        return <AnalyzeJob />;
      case 'Match Resume':
        return <MatchResume />;
      case 'Cover Letter':
        return <CoverLetter />;
      case 'Tracker':
        return <Tracker />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex min-h-[calc(100vh-105px)] relative">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
          fixed lg:static inset-y-0 left-0 z-30
          transform transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
        >
          <Sidebar
            activeTab={activeTab}
            setActiveTab={(tab) => {
              setActiveTab(tab);
              setSidebarOpen(false);
            }}
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 md:p-8 bg-gray-50 min-w-0">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default App;
