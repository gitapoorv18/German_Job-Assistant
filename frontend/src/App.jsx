import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AnalyzeJob from './pages/AnalyzeJob';
import MatchResume from './pages/MatchResume';
import CoverLetter from './pages/CoverLetter';
import Tracker from './pages/Tracker';

function App() {
  const [activeTab, setActiveTab] = useState('Analyze Job');

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
      <Header />

      <div className="flex min-h-[calc(100vh-105px)]">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content Area */}
        <div className="flex-1 p-8 bg-gray-50">{renderPage()}</div>
      </div>
    </div>
  );
}

export default App;
