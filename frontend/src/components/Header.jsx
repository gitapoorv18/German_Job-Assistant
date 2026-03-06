import { useState } from 'react';

function Header() {
  const [skills, setSkills] = useState([
    'Frontend Dev',
    'Data Analysis',
    'German A2',
  ]);
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() === '') return;
    setSkills([...skills, newSkill.trim()]);
    setNewSkill('');
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-blue-600 text-white text-center py-2 text-xs font-medium tracking-wide">
        🇩🇪 Built for developers applying to German companies
      </div>

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-lg shadow-sm">
            🇩🇪
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 leading-tight">
              German Job Assistant
            </h1>
            <p className="text-xs text-gray-400">Powered by Gemini AI</p>
          </div>
        </div>

        {/* Skill Tags */}
        <div className="flex gap-2 items-center flex-wrap">
          {skills.map((tag, index) => (
            <span
              key={index}
              className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-medium border border-blue-100 flex items-center gap-1"
            >
              {tag}
              <button
                onClick={() => removeSkill(index)}
                className="text-blue-400 hover:text-red-400 transition-colors ml-1"
              >
                ×
              </button>
            </span>
          ))}
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addSkill()}
            placeholder="Add skill..."
            className="text-xs px-3 py-1 rounded-full border border-dashed border-gray-300 text-gray-500 w-24 focus:outline-none focus:border-blue-400 focus:w-32 transition-all"
          />
        </div>
      </div>
    </>
  );
}

export default Header;
