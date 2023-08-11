import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import Authorize from './components/Authorize';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        if (!localStorage.getItem("userProfile")) {
            setIsLoggedIn(false);
        }
    }, [isLoggedIn]);

    return (
        
            <Router>
                <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                {isLoggedIn ? (
                    <ApplicationViews />
                ) : (
                    <Authorize setIsLoggedIn={setIsLoggedIn} />
                )}
            </Router>
       
    );
}

export default App;
