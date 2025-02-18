import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import UploadFile from "./components/UploadFile";

const App = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    const handleLogin = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return (
        <Router>
            <div>
                {token && <button onClick={handleLogout}>Logout</button>}
                <Routes>
                    <Route path="/" element={!token ? <Login setToken={handleLogin} /> : <Navigate to="/upload" />} />
                    <Route path="/upload" element={token ? <UploadFile token={token} /> : <Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
