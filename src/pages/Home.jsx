import React from 'react'
import { Link } from 'react-router-dom'
console.log('El componente HOME se ha cargado');
const Home = () => {
    return (
        <div className="container mt-5">
            <div className="jumbotron">
                <h1 className="display-4">
                    Bienvenido al Sistema de Manejo de Inventario de Bodega
                </h1>
                <p className="lead">
                    Gestiona tus materiales y usuarios de manera eficiente.
                </p>
                <hr className="my-4" />
                <p>Selecciona una de las siguientes opciones para comenzar:</p>
                <div className="d-flex gap-2">
                    <Link to="/materiales" className="btn btn-primary btn-lg">
                        Gestionar Materiales
                    </Link>
                    <Link to="/usuarios" className="btn btn-secondary btn-lg">
                        Gestionar Usuarios
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home
