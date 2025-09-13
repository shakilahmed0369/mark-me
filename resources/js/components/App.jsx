import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Category from '../pages/Category';
import CreateBookmark from '../pages/CreateBookmark';
import CategoryProvider from '../context/CategoryProvider';
// import { Switch } from "@/components/ui/switch"
function App() {

    return (
        <CategoryProvider>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/categories" element={<Category />} />
                    <Route path="/create-bookmark" element={<CreateBookmark />} />
                </Route>
            </Routes>
        </CategoryProvider>
    );
}

export default App;
