import React from 'react';

const DashboardPageSkeleton: React.FC = () => {
    return (
        <div className="flex h-screen">
            {/* Side Navigation Bar */}
            <div className=" animate-pulse w-1/4 p-4">
                <div className="animate-pulse h-12 bg-gray-300 mb-4 rounded"></div>
                <div className="animate-pulse h-12 bg-gray-300 mb-4 rounded "></div>
                <div className="animate-pulse h-12 bg-gray-300 mb-4 rounded "></div>
                <div className="animate-pulse h-12 bg-gray-300 mb-4 rounded "></div>
                <div className="animate-pulse h-12 bg-gray-300 mb-4 rounded"></div>
                <div className="animate-pulse h-12 bg-gray-300 mb-4 rounded"></div>
                <div className="animate-pulse h-12 bg-gray-300 mb-4 rounded"></div>
                <div className="animate-pulse h-12 bg-gray-300 mb-4 rounded"></div>
            </div>

            {/* Main Content Area */}
            <div className="animate-pulse flex-1 p-4">
                <div className="animate-pulse h-12 bg-gray-300 mb-4 rounded"></div>
                <div className="animate-pulse h-64 bg-gray-300 mb-4 rounded"></div>
                <div className="animate-pulse h-64 bg-gray-300 mb-4 rounded"></div>
            </div>
        </div>
    );
};

export default DashboardPageSkeleton;