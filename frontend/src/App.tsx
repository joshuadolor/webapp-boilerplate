import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    const [msg, setMsg] = useState("");

    useEffect(() => {
        (async () => {
            const data = await fetch('/api/users');
            const [{ name }] = await data.json()
            setMsg(name);
        })()
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    "{msg}" from api
                </p>
            </header>
        </div>
    );
}

export default App;
