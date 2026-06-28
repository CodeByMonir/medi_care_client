import React from 'react';
import { FaUserMd, FaCircle, FaChevronRight } from 'react-icons/fa';

// Mock list of peers to render if no dynamic array is supplied via props
const DEFAULT_PEERS = [
    { id: 1, name: "Dr. Sarah Jenkins", specialty: "Cardiologist", online: true },
    { id: 2, name: "Dr. Michael Chen", specialty: "Neurologist", online: true },
    { id: 3, name: "Dr. Alisha Patel", specialty: "Pediatrician", online: false },
    { id: 4, name: "Dr. James Wilson", specialty: "Dermatologist", online: false }
];

export function FavoritePeers({ peers = DEFAULT_PEERS }) {
    return (
        <div className="bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 rounded-2xl p-5 shadow-sm transition-colors duration-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Favorite Peers</h3>
                    <p className="text-[11px] text-slate-400">Quick access to colleagues</p>
                </div>
                <button className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                    View All
                </button>
            </div>

            {/* Peers List */}
            {peers.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">No starred colleagues yet.</p>
            ) : (
                <div className="space-y-3">
                    {peers.map((peer) => (
                        <div
                            key={peer.id}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 border border-transparent hover:border-slate-100 dark:hover:border-slate-800/60 group cursor-pointer transition-all duration-200"
                        >
                            <div className="flex items-center space-x-3">
                                {/* Avatar wrap with indicator */}
                                <div className="relative">
                                    <div className="h-9 w-9 rounded-full bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                        <FaUserMd className="text-sm" />
                                    </div>
                                    {/* Activity Indicator Ring */}
                                    <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white dark:ring-slate-900 ${peer.online ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'
                                        }`} />
                                </div>

                                {/* Peer Details */}
                                <div>
                                    <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {peer.name}
                                    </h4>
                                    <p className="text-[10px] text-slate-400 font-medium">
                                        {peer.specialty}
                                    </p>
                                </div>
                            </div>

                            {/* Action arrow element */}
                            <FaChevronRight className="text-[10px] text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 -translate-x-0.5 group-hover:translate-x-0 transition-all duration-200" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}