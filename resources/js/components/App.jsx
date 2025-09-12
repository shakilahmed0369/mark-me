import React  from 'react';
import MainLayout from '../layouts/MainLayout';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Category from '../pages/Category';
// import { Switch } from "@/components/ui/switch"
function App() {

    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home/>} />
                <Route path="/categories" element={<Category/>} />
            </Route>
        </Routes>
    );
}

export default App;
