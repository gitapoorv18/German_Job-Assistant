import { useState } from 'react';

const STATUS_COLORS = {
  Applied: 'bg-blue-50 text-blue-600 border-blue-100',
  Interview: 'bg-yellow-50 text-yellow-600 border-yellow-100',
  Offer: 'bg-green-50 text-green-600 border-green-100',
  Rejected: 'bg-red-50 text-red-500 border-red-100',
};

const INITIAL_APPS = [
  {
    id: 1,
    company: 'SAP SE',
    role: 'Frontend Developer',
    status: 'Applied',
    date: '2026-03-01',
    score: 87,
  },
  {
    id: 2,
    company: 'Siemens AG',
    role: 'React Developer',
    status: 'Interview',
    date: '2026-03-03',
    score: 92,
  },
  {
    id: 3,
    company: 'Bosch GmbH',
    role: 'UI Engineer',
    status: 'Rejected',
    date: '2026-02-28',
    score: 74,
  },
];

function Tracker() {
  const [applications, setApplications] = useState(INITIAL_APPS);
  const [filter, setFilter] = useState('All');
  const [form, setForm] = useState({
    company: '',
    role: '',
    status: 'Applied',
    score: '',
  });
  const [showForm, setShowForm] = useState(false);

  const addApplication = () => {
    if (form.company.trim() === '' || form.role.trim() === '') return;
    const newApp = {
      id: Date.now(),
      company: form.company,
      role: form.role,
      status: form.status,
      score: parseInt(form.score) || 0,
      date: new Date().toISOString().split('T')[0],
    };
    setApplications([newApp, ...applications]);
    setForm({ company: '', role: '', status: 'Applied', score: '' });
    setShowForm(false);
  };

  const deleteApplication = (id) => {
    setApplications(applications.filter((app) => app.id !== id));
  };

  const updateStatus = (id, status) => {
    setApplications(
      applications.map((app) => (app.id === id ? { ...app, status } : app))
    );
  };

  const filtered =
    filter === 'All'
      ? applications
      : applications.filter((app) => app.status === filter);

  const counts = {
    All: applications.length,
    Applied: applications.filter((a) => a.status === 'Applied').length,
    Interview: applications.filter((a) => a.status === 'Interview').length,
    Offer: applications.filter((a) => a.status === 'Offer').length,
    Rejected: applications.filter((a) => a.status === 'Rejected').length,
  };

  return (
    <div>
      {/* Page Title */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">📋 Tracker</h2>
          <p className="text-sm text-gray-400 mt-1">
            Track all your job applications
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all"
        >
          + Add Application
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            New Application
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Company name"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-400"
            />
            <input
              type="text"
              placeholder="Role / Position"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-400"
            />
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-400"
            >
              {Object.keys(STATUS_COLORS).map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Match score (optional)"
              value={form.score}
              onChange={(e) => setForm({ ...form, score: e.target.value })}
              className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={addApplication}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all"
            >
              Add
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium px-4 py-2 rounded-xl transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {Object.entries(counts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`bg-white rounded-2xl border p-4 text-center transition-all ${
              filter === status
                ? 'border-blue-400 shadow-sm'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-2xl font-bold text-gray-900">{count}</div>
            <div className="text-xs text-gray-400 mt-1">{status}</div>
          </button>
        ))}
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center p-12">
            <div className="text-center">
              <div className="text-4xl mb-3">📋</div>
              <p className="text-gray-400 text-sm">No applications yet</p>
            </div>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-3">
                  Company
                </th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-3">
                  Role
                </th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-3">
                  Score
                </th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-3">
                  Date
                </th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app, i) => (
                <tr
                  key={app.id}
                  className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                    i === filtered.length - 1 ? 'border-none' : ''
                  }`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {app.company}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {app.role}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={app.status}
                      onChange={(e) => updateStatus(app.id, e.target.value)}
                      className={`text-xs font-medium px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${
                        STATUS_COLORS[app.status]
                      }`}
                    >
                      {Object.keys(STATUS_COLORS).map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    {app.score > 0 && (
                      <span
                        className={`text-xs font-semibold ${
                          app.score >= 80
                            ? 'text-green-600'
                            : app.score >= 60
                            ? 'text-yellow-500'
                            : 'text-red-500'
                        }`}
                      >
                        {app.score}%
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {app.date}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteApplication(app.id)}
                      className="text-gray-300 hover:text-red-400 transition-colors text-lg"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Tracker;
