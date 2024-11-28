import React, { useEffect, useState } from "react"
import Barra from "./partials/_navbar.jsx"
import './general.css'
import { cartService, logedService, matService } from "../services/api.js"
import { Route, Routes } from "react-router-dom"

const Materiales = () => {

    const [materiales, setMateriales] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [ingresado, setIngresado] = useState([]);
    const [id_material, setId_Material] = useState('');
    const [id_categoria, setIdCategoria] = useState('')
    const [nombre_material, setNombre] = useState('');
    const [precio_venta, setPrecioVenta] = useState('');
    const [precio_compra, setPrecioCompra] = useState('');
    const [cantidad, setCantidad] = useState('');

    useEffect(() => {
        extraer()
    })
    const extraer = async () => {
        try {
            const res = await logedService.getData()
            setMateriales(res.data.materiales)
            setCategorias(res.data.categorias)
            setIngresado(res.data.persona)

        } catch (error) {
            console.error(error);
        }

    }
    const addCarrito = async (mat) => {

        try {
            const response = await cartService.create({ mat, cantidad }, ingresado.rut)
            console.log('Llegó');

            console.log('Agregado con éxito:', response.data)
            localStorage.setItem('token', response.data.token)

        } catch (err) {

            console.error('Login error:', err)
        }
    }
    const addMaterial = async () => {
        try {
            const res = await matService.create({ nombre_material, id_categoria, precio_venta, precio_compra, cantidad })

        } catch (error) {
            console.error(error);

        }
    }
    const addMat = () => {
        return (
            <div data-addMat id='addMat' className="add">
                <form id="agregar" onSubmit={() => addMaterial()}>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            name='nombre_material'
                            id="nombre_material"
                            onChange={(e) => setNombre(e.target.value)}
                            required

                        />
                        <label htmlFor="nombre_material">Nombre</label>
                    </div>
                    <label htmlFor="id_categoria">Categoría</label>
                    <div className="form-floating mb-3">
                        <div>

                            <select className="form-select" id="id_categoria"
                                onChange={(e) => setIdCategoria(e.target.value)}>
                                {categorias.map((cat) => (
                                    <option value={cat.id_categoria}> {cat.nombre_categoria}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            name='precio_compra'
                            id="precio_compra"
                            onChange={(e) => setPrecioCompra(e.target.value)}
                            required

                        />
                        <label htmlFor="precio_compra">Precio Compra</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="number"
                            className="form-control"
                            name='precio_venta'
                            id="precio_venta"
                            onChange={(e) => setPrecioVenta(e.target.value)}
                            required

                        />
                        <label htmlFor="precio_venta">Precio Venta</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            name='inventario'
                            id="inventario"
                            onChange={(e) => setCantidad(e.target.value)}
                            required

                        />
                        <label htmlFor="inventario">Unidades Disponibles</label>
                    </div>
                    <hr />



                    <br />
                    <button type="submit" className="btn btn-primary form-control">Confirmar</button>
                    <button onClick={() => ocultar()} type="button" className="btn btn-danger form-control">Close</button>

                </form>
            </div>
        )
    }

    return (
        <div>
            <Barra />
            <hr />
            <div className="loged">
                <div className="tittle">
                    <h1>MATERIALES</h1>
                </div>
                <div>
                    <button onClick={() => { showAddMat() }} data-target='#addMat' className="btn btn-success" id="btn-addMat">Agregar</button>
                </div>
                <br />
                {addMat(categorias)}
                {materiales.map(mat => (

                    <div data-addCarrito id={"agregar_carrito-" + mat.id_material} className="add">

                        <div className="modal-content">

                            <div className="modal-body">
                                <form id="agregar" onSubmit={() => addCarrito(mat.id_material, mat.precio_venta)}>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name='id_material'
                                            id="id_material"
                                            value={mat.id_material}
                                            required
                                            disabled
                                        />
                                        <label htmlFor="mail">ID</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name='nombre_material'
                                            id="nombre_material"
                                            value={mat.nombre_material}
                                            required
                                            disabled
                                        />
                                        <label htmlFor="mail">Nombre</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name='nombre_categoria'
                                            id="nombre_categoria"
                                            value={mat.nombre_categoria}
                                            required
                                            disabled
                                        />
                                        <label htmlFor="mail">Categoría</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name='precio_venta'
                                            id="precio_venta"
                                            value={mat.precio_venta}
                                            required
                                            disabled
                                        />
                                        <label htmlFor="mail">Precio de Venta</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name='inventario'
                                            id="inventario"
                                            value={mat.inventario}
                                            required
                                            disabled
                                        />
                                        <label htmlFor="mail">Unidades Disponibles</label>
                                    </div>
                                    <hr />

                                    <div className="form-group">
                                        Unidades a Agregar:<br />
                                        <input type="number" name="cantidad" id="cantidad" min="1" max={mat.inventario}
                                            onChange={(e) => setCantidad(e.target.value)} />
                                    </div>

                                    <br />
                                    <button type="submit" className="btn btn-primary form-control">Confirmar</button>
                                    <button onClick={() => ocultar()} type="button" className="btn btn-danger form-control">Close</button>

                                </form>

                            </div>

                        </div>

                    </div>
                ))}
                <table data-content className="table table-bordered table-hover active">
                    <thead >
                        <tr className="table-dark">
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Categoria</th>
                            <th>Precio</th>
                            <th>Unidades <br /> Disponibles</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materiales.map((mat) => (
                            filas(mat)
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="table-dark">
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Precio</th>
                            <th>Unidades Disponibles</th>
                            <th>Acciones</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}



const filas = (mat) => {
    return (
        <tr className="table-secondary" key={mat.id_material}>
            <td>{mat.id_material}</td>
            <td>{mat.nombre_material}</td>
            <td>{mat.nombre_categoria}</td>
            <td>${mat.precio_venta}</td>
            <td>
                <span className="badge bg-primary rounded-pill">
                    {mat.inventario}
                </span>
            </td>
            <td>
                <div className="accordion" id={"acordion_" + mat.id_material}>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id={"heading_" + mat.id_material}>
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse_" + mat.id_material} aria-expanded="false" aria-controls={"collapse_" + mat.id_material}>Acciones</button>
                        </h2>
                        <div id={"collapse_" + mat.id_material} className="accordion-collapse collapse" aria-labelledby={"heading_" + mat.id_material} data-bs-parent={"#acordion_" + mat.id_material}>
                            <div className="accordion-body">
                                <a className="btn btn-primary form-control" href="/">Editar</a>
                                <a className="btn btn-danger form-control" href="/">Eliminar</a>
                                {/** Modificar para que tambien haya un boton de ver en el carrito si ya está */}
                                <button data-target={"#agregar_carrito-" + mat.id_material} onClick={() => showAddCarrito(mat)} className="btn btn-secondary form-control bi bi-cart-plus" id={"btn_addCarrito_" + mat.id_material}>
                                    Añadir</button>
                            </div>
                        </div>
                    </div>

                </div>
            </td>

        </tr>
    )
}



async function showAddCarrito(mat) {
    ocultar()
    const target = document.getElementById("btn_addCarrito_" + mat.id_material);
    const t = document.querySelector(target.dataset.target)

    //ocultar todos
    document.querySelectorAll('[data-addCarrito]').forEach((add) => {
        add.classList.remove('active')
    })

    //mostrar el correspondiente
    t.classList.add('active')

}
function showAddMat() {
    ocultar()
    const target = document.getElementById('btn-addMat')
    const add = document.querySelector(target.dataset.target)

    add.classList.add('active');
}
async function ocultar() {
    document.querySelectorAll('[data-addCarrito]').forEach((add) => {
        add.classList.remove('active')
    })
    const add = document.getElementById('btn-addMat')
    const target = document.querySelector(add.dataset.target)
    target.classList.remove('active');
}
export default Materiales