import React, { StrictMode } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Usuarios from './pages/Usuarios.jsx'
import Materiales from './pages/Materiales.jsx'
import Nav from './components/Navbar.jsx'

const App = () => (
    <StrictMode>
        <Router>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/materiales" element={<Materiales />} />
            </Routes>
        </Router>
    </StrictMode>
)

export default App
