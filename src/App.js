import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing';
import Home from './pages/home';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Landing />} />
                <Route exact path="/home" element={<Home />} />
                <Route path="*" element={<Landing />} />
            </Routes>
        </Router>
    );
};

export default App;
