import { useState } from 'react';
import PdfUploader from '../components/PdfUploader';
import API_URL from '../config';

function CoverLetter() {
  const [jobDesc, setJobDesc] = useState('');
  const [resume, setResume] = useState('');
  const [language, setLanguage] = useState('both');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const generateCoverLetter = async () => {
    if (jobDesc.trim() === '' || resume.trim() === '') return;
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/cover-letter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDesc, resume, language }),
      });

      const data = await response.json();

      if (data.error) {
        alert(`Error: ${data.error}`);
        return;
      }

      setResult(data);
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Check your backend!');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      {/* Page Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          ✉️ Cover Letter
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Generate a professional cover letter in English & German
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
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

          {/* Resume */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <PdfUploader
              label="Your Resume"
              onTextExtracted={(text) => setResume(text)}
            />
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="Upload PDF above or paste resume here..."
              rows={6}
              className="w-full text-sm border border-gray-200 rounded-xl p-3 text-gray-700 resize-none focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
            />
          </div>

          {/* Language Selector */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <label className="text-sm font-medium text-gray-700 mb-3 block">
              Language
            </label>
            <div className="flex gap-3">
              {[
                { value: 'english', label: '🇬🇧 English' },
                { value: 'german', label: '🇩🇪 German' },
                { value: 'both', label: '🌍 Both' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setLanguage(option.value)}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all ${
                    language === option.value
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generateCoverLetter}
            disabled={loading || jobDesc.trim() === '' || resume.trim() === ''}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium py-2.5 rounded-xl text-sm transition-all"
          >
            {loading ? 'Generating...' : 'Generate Cover Letter ✨'}
          </button>
        </div>

        {/* Right — Result */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          {!result && !loading && (
            <div className="flex items-center justify-center h-full min-h-64">
              <div className="text-center">
                <div className="text-4xl mb-3">✉️</div>
                <p className="text-gray-400 text-sm">
                  Your cover letter will appear here
                </p>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center h-full min-h-64">
              <div className="text-center">
                <div className="text-3xl mb-3 animate-spin">⚙️</div>
                <p className="text-gray-400 text-sm">
                  Writing your cover letter...
                </p>
              </div>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-4">
              {/* English Version */}
              {result.english && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      🇬🇧 English Version
                    </p>
                    <button
                      onClick={() => copyToClipboard(result.english)}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {copied ? '✅ Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto">
                    {result.english}
                  </div>
                </div>
              )}

              {/* German Version */}
              {result.german && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      🇩🇪 German Version
                    </p>
                    <button
                      onClick={() => copyToClipboard(result.german)}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {copied ? '✅ Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto">
                    {result.german}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CoverLetter;
