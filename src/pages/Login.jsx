import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services/api.js'
import './login.css'

const Login = () => {
    const [mail, setEmail] = useState('')
    const [clave, setClave] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            const response = await authService.login(mail, clave)
            console.log('Llegó');
            
            console.log('Login successful:', response.data)
            localStorage.setItem('token', response.data.token)
            navigate('/materiales')
        } catch (err) {
            setError(
                'Error al iniciar sesión. Por favor, verifica tus credenciales.'
            )
            console.error('Login error:', err)
        }
    }

    return (
        <div className="container mt-5">
            <div className="card login">
                <div className="card-body">
                    <h1 className="card-title text-center">Iniciar Sesión</h1> <hr />
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                name='mail'
                                id="mail"
                                value={mail}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label htmlFor="mail">Mail*</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                name='clave'
                                id="clave"
                                value={clave}
                                onChange={(e) => setClave(e.target.value)}
                                required
                            />
                            <label htmlFor="clave">Contraseña*</label>
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                                Iniciar Sesión
                            </button>
                        </div>
                    </form>
                    <div className="mt-3 text-center">
                        <Link to="/" className="btn btn-link">
                            Volver a Inicio
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login
