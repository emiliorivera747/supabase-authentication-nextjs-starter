import React from 'react'

const HomePageSkeleton = () => {
    return (
        <div className="animate-pulse">
            <nav className="flex justify-between p-4 border-b border-gray-200 mx-10">
                <div className="flex items-center">
                    <div className="h-10 w-32 bg-gray-300 rounded"></div>
                </div>
                <div className="h-10 w-24 bg-gray-300 rounded"></div>
            </nav>
            <header className="text-center h-[25rem] items-center flex flex-col mt-[10%] bg-white">
                <div className="h-10 w-64 bg-gray-300 rounded mb-4"></div>
                <div className="h-6 w-80 bg-gray-300 rounded mb-4"></div>
                <div className="h-12 w-40 bg-gray-300 rounded"></div>
            </header>
            <footer className="p-4 border-t border-gray-200 mt-auto">
                <div className="h-6 w-full bg-gray-300 rounded"></div>
            </footer>
        </div>
    );
};

export default HomePageSkeleton;