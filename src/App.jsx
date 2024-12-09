import React, { StrictMode } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Usuarios from './pages/Usuarios.jsx'
import Materiales from './pages/Materiales.jsx'
import Nav from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'

const App = () => (
    <StrictMode>
        <Router>
            <div className="container-fluid p-0">
                <Nav />
                <div className="row g-0">
                    <div className="col-md-1 col-sm-3 p-0">
                        <Sidebar />
                    </div>

                    <div className="col-md-10 col-sm-9">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/usuarios" element={<Usuarios />} />
                            <Route
                                path="/materiales"
                                element={<Materiales />}
                            />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    </StrictMode>
)

export default App
