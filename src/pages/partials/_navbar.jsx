import React from "react";

function Barra() {
    return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark" id='navbar'>
        <div className="container-fluid">
            <a className="navbar-brand" href="/">Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02"
                aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle active" data-bs-toggle="dropdown" href="/" role="button"
                            aria-haspopup="true" aria-expanded="false">Mercadería</a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="./materiales">Productos</a>
                            <a className="dropdown-item" href="./categorias">Categorias</a>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="">Home
                            <span className="visually-hidden">(current)</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="/">Features</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="/">Pricing</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="./usuarios">Usuarios</a>
                    </li>

                </ul>
                <div className="d-flex">
                    <a className="btn btn-secondary bi bi-cart" href="./carrito">.</a>
                    <a className="btn btn-danger" href="../login">
                        <h6>Cerrar Sesión<i className="bi bi-door-open"></i></h6>
                        
                      </a>
                </div>
            </div>
        </div>
    </nav>
    );
}

export default Barra