// import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import { Landing } from './pages/landing';
import { Banner } from './components/banner';
import { Header } from './components/header';
import { About } from './pages/about';
import { Menu } from './pages/menu';
import { useState } from 'react';
import { IssueViewer } from './pages/issue-viewer';

function App() {
    const [menuVisible, setMenuVisible] = useState(false);
    const toggleMenuVisible = () => {
        setMenuVisible(!menuVisible);
    }

    return (
        <>
            <div id="stackpanel">
                <Banner />
                <Header toggleMenuVisible={toggleMenuVisible} />
                <Menu toggleMenuVisible={toggleMenuVisible} menuVisible={menuVisible} />
                <div id="pages">
                    <BrowserRouter>
                        <Routes>
                            <Route index element={<Landing />} />
                            <Route path="about" element={<About />} />
                            <Route path="issues/:issueId/:pageId?" element={<IssueViewer />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        </>
    );
};

export default App
