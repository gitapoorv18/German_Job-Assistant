import { useState } from 'react';
import API_URL from '../config';

function AnalyzeJob() {
  const [jobDesc, setJobDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const analyzeJob = async () => {
    if (jobDesc.trim() === '') return;
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/analyze-job`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDesc }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Check your backend!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Page Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">🔍 Analyze Job</h2>
        <p className="text-sm text-gray-400 mt-1">
          Paste a job description to get AI insights
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Left — Input */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Job Description
          </label>
          <textarea
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            placeholder="Paste German or English job description here..."
            rows={12}
            className="w-full text-sm border border-gray-200 rounded-xl p-3 text-gray-700 resize-none focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
          />
          <button
            onClick={analyzeJob}
            disabled={loading || jobDesc.trim() === ''}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium py-2.5 rounded-xl text-sm transition-all"
          >
            {loading ? 'Analyzing...' : 'Analyze with AI ✨'}
          </button>
        </div>

        {/* Right — Results */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          {!result && !loading && (
            <div className="flex items-center justify-center h-full min-h-64">
              <div className="text-center">
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-gray-400 text-sm">
                  Results will appear here
                </p>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center h-full min-h-64">
              <div className="text-center">
                <div className="text-3xl mb-3 animate-spin">⚙️</div>
                <p className="text-gray-400 text-sm">
                  Analyzing job description...
                </p>
              </div>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-4">
              {/* Job Title & Company */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {result.title}
                </h3>
                <p className="text-sm text-gray-500">{result.company}</p>
              </div>

              {/* Badges */}
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 font-medium">
                  🌍 {result.language}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-yellow-50 text-yellow-600 border border-yellow-100 font-medium">
                  ⚡ {result.difficulty}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-100 font-medium">
                  🇩🇪 {result.germanLevel}
                </span>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {result.summary}
                </p>
              </div>

              {/* Key Skills */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Key Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.keySkills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Requirements
                </p>
                <ul className="space-y-1">
                  {result.requirements.map((req, i) => (
                    <li
                      key={i}
                      className="text-sm text-gray-600 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnalyzeJob;
