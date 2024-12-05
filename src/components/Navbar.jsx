import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { authService, sessionService } from '../services/api'

const Navbar = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['sessionID'])
    const [sesion, setSesion] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const checkSession = async () => {
            try {
                const sessionID = cookies.sessionID
                if (sessionID) {
                    const sessionData = await sessionService.getSession(
                        sessionID
                    )
                    if (sessionData) {
                        setSesion(true)
                    } else {
                        setSesion(false)
                    }
                } else {
                    setSesion(false)
                }
            } catch (error) {
                console.error('Error al verificar la sesión:', error)
                setSesion(false)
            }
        }

        checkSession()
    }, [cookies.sessionID])

    const logout = async () => {
        try {
            await authService.logout()
            removeCookie('sessionID', { path: '/' })
            setSesion(false)
            navigate('/login')
        } catch (error) {
            console.error('Error al cerrar sesión:', error)
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Bodega
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Inicio
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/materiales">
                                Materiales
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/usuarios">
                                Usuarios
                            </Link>
                        </li>
                    </ul>

                    <ul className="navbar-nav ms-auto">
                        {sesion ? (
                            <li className="nav-item">
                                <button
                                    className="btn btn-link nav-link"
                                    onClick={logout}
                                >
                                    Cerrar sesión
                                </button>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    Iniciar sesión
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
