import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Category from '../pages/Category';
import CreateBookmark from '../pages/CreateBookmark';
import CategoryProvider from '../context/CategoryProvider';
import BookmarkProvider from '../context/BookmarkProvider';

function App() {

    return (
        <CategoryProvider>
            <BookmarkProvider>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/categories" element={<Category />} />
                        <Route path="/create-bookmark" element={<CreateBookmark />} />
                        <Route path="/bookmarks/:id/edit" element={<CreateBookmark />} />

                    </Route>
                </Routes>
            </BookmarkProvider>
        </CategoryProvider>
    );
}

export default App;
