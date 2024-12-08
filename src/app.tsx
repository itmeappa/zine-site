// import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import { Landing } from './pages/landing';
import { Banner } from './components/banner';
import { Header } from './components/header';
import { About } from './pages/about';


function App() {
    return (
        <div id="root">
            <Banner />
            <Header />
            <BrowserRouter>
            <Routes>
                <Route index element={<Landing />} />
                <Route path="about" element={<About />} />
            </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App
