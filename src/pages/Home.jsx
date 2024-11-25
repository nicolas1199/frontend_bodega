import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h1 className="card-title text-center">
                        Bienvenido a la página de inicio
                    </h1>
                    <p className="card-text text-center">
                        Esta es la página principal de nuestra aplicación.
                    </p>
                    <div className="d-flex justify-content-center">
                        <Link to="/login" className="btn btn-primary me-2">
                            Ir a Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
