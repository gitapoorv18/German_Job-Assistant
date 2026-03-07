import { useState } from 'react';
import PdfUploader from '../components/PdfUploader';
import API_URL from '../config';

function MatchResume() {
  const [jobDesc, setJobDesc] = useState('');
  const [resume, setResume] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const matchResume = async () => {
    if (jobDesc.trim() === '' || resume.trim() === '') return;
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/match-resume`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDesc, resume }),
      });

      const data = await response.json();
      console.log('Backend response:', data); // check this in browser console

      if (data.error) {
        alert(`Error: ${data.error}`);
        return;
      }

      setResult({
        score: data.score ?? 0,
        verdict: data.verdict ?? 'Unknown',
        matchedSkills: data.matchedSkills ?? [],
        missingSkills: data.missingSkills ?? [],
        suggestions: data.suggestions ?? [],
      });
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Check your backend!');
    } finally {
      setLoading(false);
    }
  };
  const scoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const scoreBg = (score) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const verdictColor = (verdict) => {
    if (verdict === 'Strong Match')
      return 'bg-green-50 text-green-600 border-green-100';
    if (verdict === 'Good Match')
      return 'bg-yellow-50 text-yellow-600 border-yellow-100';
    if (verdict === 'Partial Match')
      return 'bg-orange-50 text-orange-600 border-orange-100';
    return 'bg-red-50 text-red-600 border-red-100';
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          📊 Match Resume
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          See how well your resume matches the job
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left — Inputs */}
        <div className="flex flex-col gap-4">
          {/* Job Description */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Job Description
            </label>
            <textarea
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              placeholder="Paste job description here..."
              rows={6}
              className="w-full text-sm border border-gray-200 rounded-xl p-3 text-gray-700 resize-none focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
            />
          </div>

          {/* Resume with PDF Upload */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <PdfUploader
              label="Your Resume"
              onTextExtracted={(text) => setResume(text)}
            />
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="Upload PDF above or paste your resume here..."
              rows={6}
              className="w-full text-sm border border-gray-200 rounded-xl p-3 text-gray-700 resize-none focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
            />
          </div>

          <button
            onClick={matchResume}
            disabled={loading || jobDesc.trim() === '' || resume.trim() === ''}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium py-2.5 rounded-xl text-sm transition-all"
          >
            {loading ? 'Analyzing...' : 'Match with AI ✨'}
          </button>
        </div>

        {/* Right — Results */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          {!result && !loading && (
            <div className="flex items-center justify-center h-full min-h-64">
              <div className="text-center">
                <div className="text-4xl mb-3">📊</div>
                <p className="text-gray-400 text-sm">
                  Paste your JD and resume to see match score
                </p>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center h-full min-h-64">
              <div className="text-center">
                <div className="text-3xl mb-3 animate-spin">⚙️</div>
                <p className="text-gray-400 text-sm">Matching your resume...</p>
              </div>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-5">
              <div
                className={`rounded-2xl border p-5 text-center ${scoreBg(
                  result.score
                )}`}
              >
                <div
                  className={`text-6xl font-bold ${scoreColor(result.score)}`}
                >
                  {result.score}%
                </div>
                <div className="mt-2">
                  <span
                    className={`text-xs px-3 py-1 rounded-full border font-medium ${verdictColor(
                      result.verdict
                    )}`}
                  >
                    {result.verdict}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  ✅ Matched Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.matchedSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 bg-green-50 text-green-600 border border-green-100 rounded-lg font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  ❌ Missing Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.missingSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 bg-red-50 text-red-500 border border-red-100 rounded-lg font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  💡 Suggestions
                </p>
                <ul className="space-y-2">
                  {result.suggestions.map((s, i) => (
                    <li
                      key={i}
                      className="text-sm text-gray-600 flex items-start gap-2 bg-gray-50 rounded-xl p-3"
                    >
                      <span className="text-blue-400 mt-0.5">→</span>
                      {s}
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

export default MatchResume;
