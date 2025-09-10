import React, { useState } from 'react';
// import { Switch } from "@/components/ui/switch"
function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    React + Laravel 12
                </h1>
                <div className="space-y-4">
                    <p className="text-gray-600">Count: {count}</p>
                    <div className="space-x-2">
                        <button
                            onClick={() => setCount(count + 1)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Increment
                        </button>
                        <button
                            onClick={() => setCount(count - 1)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Decrement
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
