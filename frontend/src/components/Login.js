import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const formData = new URLSearchParams();
            formData.append("username", username);
            formData.append("password", password);

            const res = await axios.post("http://127.0.0.1:8000/token", formData, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });

            setToken(res.data.access_token);
            localStorage.setItem("token", res.data.access_token);  // Store the token in localStorage
            navigate("/upload");  // Redirect to the file upload page
        } catch (error) {
            setError("Invalid username or password");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Login</h2>
            <div>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
                />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button onClick={handleLogin} style={{ padding: "10px 20px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}>
                Login
            </button>
        </div>
    );
};

export default Login;
