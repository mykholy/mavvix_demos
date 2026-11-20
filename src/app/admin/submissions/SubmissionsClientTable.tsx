'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Archive, Clock, Eye, X } from 'lucide-react';

interface Props {
  initialSubmissions: any[];
  currentSite?: string;
}

export function SubmissionsClientTable({ initialSubmissions, currentSite }: Props) {
  const router = useRouter();
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [selectedSub, setSelectedSub] = useState<any | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function updateStatus(id: string, newStatus: string) {
    setUpdatingId(id);
    try {
      const res = await fetch('/api/admin/submissions/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setSubmissions(prev =>
          prev.map(s => s.id === id ? { ...s, status: newStatus } : s)
        );
        if (selectedSub && selectedSub.id === id) {
          setSelectedSub({ ...selectedSub, status: newStatus });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="space-y-4">
      {/* Table Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {submissions.length === 0 ? (
          <div className="text-center py-16">
            <Clock className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-white">Queue Empty</h3>
            <p className="text-xs text-slate-400 mt-1">
              No submissions found for the selected vertical filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Ref Number</th>
                  <th className="py-3 px-4">Vertical</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Contact / Identity</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Submitted At</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {submissions.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-mono font-bold text-cyan-300">
                      {s.payload?.refNumber || s.id.slice(0, 10)}
                    </td>
                    <td className="py-3 px-4 capitalize font-medium">{s.site_slug}</td>
                    <td className="py-3 px-4">{s.flow_type.replace('_', ' ')}</td>
                    <td className="py-3 px-4 text-slate-400">
                      {s.payload?.name || s.payload?.clientName || s.payload?.email || 'Demo Visitor'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                        s.status === 'simulated' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                        s.status === 'reviewed' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                        'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {new Date(s.created_at).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedSub(s)}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-white transition-colors"
                        title="Inspect Payload"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      {s.status !== 'reviewed' && (
                        <button
                          disabled={updatingId === s.id}
                          onClick={() => updateStatus(s.id, 'reviewed')}
                          className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-white transition-colors"
                          title="Mark Reviewed"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {s.status !== 'archived' && (
                        <button
                          disabled={updatingId === s.id}
                          onClick={() => updateStatus(s.id, 'archived')}
                          className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                          title="Archive"
                        >
                          <Archive className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Inspector for Payload */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">
                  Submission Payload: {selectedSub.payload?.refNumber || selectedSub.id}
                </h3>
                <p className="text-xs text-slate-400">
                  Vertical: {selectedSub.site_slug} • Flow: {selectedSub.flow_type}
                </p>
              </div>
              <button
                onClick={() => setSelectedSub(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <pre className="bg-slate-950 p-4 rounded-xl text-xs font-mono text-cyan-300 max-h-96 overflow-y-auto border border-slate-800">
              {JSON.stringify(selectedSub.payload, null, 2)}
            </pre>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setSelectedSub(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Close
              </button>
              {selectedSub.status !== 'reviewed' && (
                <button
                  onClick={() => updateStatus(selectedSub.id, 'reviewed')}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                >
                  Mark Reviewed
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

