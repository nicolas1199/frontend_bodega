import React, { StrictMode } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Usuarios from './pages/Usuarios.jsx'
import Materiales from './pages/Materiales.jsx'
import Navbar from './components/Navbar.jsx'
console.log('El componente App se ha cargado');
const App = () => (
    
    <StrictMode>
        <Router>
            <Navbar />
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
