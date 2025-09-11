import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
// import { Switch } from "@/components/ui/switch"
function App() {
    const [count, setCount] = useState(0);

    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home/>} />
            </Route>
        </Routes>
    );
}

export default App;
