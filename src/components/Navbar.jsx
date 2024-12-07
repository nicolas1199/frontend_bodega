import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { authService, sessionService } from '../services/api'
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap'

const Navigation = () => {
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
                    console.log('sessionData:', sessionData)
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
        <div>
            <Navbar className="--bs-primary-bg-subtle" expand="lg" style={{paddingLeft:'5%', paddingRight:'5%'}}>
                <Navbar.Brand as={Link} to="/">
                    Bodega
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarNav" />
                <Navbar.Collapse id="navbarNav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">
                            Inicio
                        </Nav.Link>
                        <Nav.Link as={Link} to="/materiales">
                            Materiales
                        </Nav.Link>
                        <Nav.Link as={Link} to="/usuarios">
                            Usuarios
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        {sesion ? (
                            <Nav.Link as={Button} variant="link" onClick={logout}>
                                Cerrar sesión
                            </Nav.Link>
                        ) : (
                            <Nav.Link as={Link} to="/login">
                                Iniciar sesión
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Navigation
