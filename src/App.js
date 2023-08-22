import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing';
import Home from './pages/home';
import Signup from './pages/signup';
import {NextUIProvider} from "@nextui-org/react";

const App = () => {
    return (
        <NextUIProvider>
            <Router>
                <Routes>
                    <Route
                        exact path="/" element={<Landing />}
                    />
                    <Route exact path="/home" element={<Home />} />
                    <Route exact path="/signup" element={<Signup />} />
                    <Route path="*" element={<Landing />} />
                </Routes>
            </Router>
        </NextUIProvider>
    );
};

export default App;
