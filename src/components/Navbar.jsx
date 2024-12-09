import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { authService, sessionService } from '../services/api'
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap'

const Navigation = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['sessionID'])
    const [sesion, setSesion] = useState(false)
    const [user, setUser] = useState(null)
    const [rol, setRol] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await sessionService.getSession()
                const user = response.data.user

                if (user) {
                    setSesion(true)
                    setUser(user.mail)
                    setRol(user.rol)
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
        <Navbar
            className="nav"
            expand="lg"
            style={{ paddingLeft: '1%', paddingRight: '1%' }}
        >
            <Navbar.Brand className="text-white" as={Link} to="/">
                Bodega
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNav" />
            <Navbar.Collapse id="navbarNav">
                <Nav className="me-auto">
                    <Nav.Link className="text-white" as={Link} to="/">
                        Inicio
                    </Nav.Link>
                </Nav>
                <Nav className="ms-auto">
                    {sesion ? (
                        <NavDropdown title="Usuarios" align="end">
                            <NavDropdown.ItemText>
                                {user}
                                {rol === 'admin' ? ' (Administrador)' : ''}
                                {rol === 'cliente' ? ' (Usuario)' : ''}
                            </NavDropdown.ItemText>

                            <NavDropdown.Item as={Link} to="/perfil">
                                Perfil
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/ajustes">
                                Ajustes
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={logout}>
                                Cerrar sesión
                            </NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <Nav.Link as={Link} to="/login">
                            Iniciar sesión
                        </Nav.Link>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation
