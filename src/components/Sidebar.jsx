import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <Nav
            className="d-flex flex-column sidebar text-white"
            style={{
                height: '100vh',
            }}
        >
            <Nav.Item>
                <Nav.Link as={Link} to="/materiales" className="text-white">
                    Materiales
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/usuarios" className="text-white">
                    Usuarios
                </Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

export default Sidebar
