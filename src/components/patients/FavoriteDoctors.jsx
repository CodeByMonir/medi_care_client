import React from 'react';

const FavoriteDoctors = ({ doctorData = [] }) => {
    // .slice(0, 2) দিয়ে শুধুমাত্র প্রথম ২টি অবজেক্ট নেওয়া হয়েছে
    const doctors = doctorData.slice(0, 2);

    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-200">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Favorite Doctors
            </h2>

            {doctors.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">No doctors available.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {doctors.map((doc) => (
                        <div
                            key={doc._id?.toString()}
                            className="p-4 border border-gray-100 dark:border-gray-800 rounded-lg flex flex-col justify-between bg-gray-50/50 dark:bg-gray-800/40"
                        >
                            <div>
                                <div className="flex items-center justify-between">
                                    <span
                                        className={`h-2.5 w-2.5 rounded-full ${doc.online ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                                        title={doc.online ? 'Online' : 'Offline'}
                                    />
                                    <span className="text-xs font-semibold text-amber-500">⭐ {doc.rating}</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mt-2">
                                    {doc.name}
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {doc.specialty || doc.specialization}
                                </p>
                            </div>
                            <button className="mt-4 w-full py-1.5 border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-md hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors">
                                Book Visit
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoriteDoctors;