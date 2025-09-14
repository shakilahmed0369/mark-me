import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import '../css/app.css';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <App />
        <ToastContainer />
    </BrowserRouter>
);
