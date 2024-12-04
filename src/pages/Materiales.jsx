import React, { act, useEffect, useState } from 'react'
import { matService } from '../services/api.js'
import { categoriaService } from '../services/api.js'
import DataTable from 'datatables.net-react'
import DT from 'datatables.net-bs5'
import './Materiales.css'

DataTable.use(DT)

const Materiales = () => {
    const [materiales, setMateriales] = useState([])
    const [categorias, setCategorias] = useState([])
    const [newMaterial, setNewMaterial] = useState({
        nombre: '',
        inventario: '',
        precio_compra: '',
        precio_venta: '',
        id_categoria: '',
    })

    useEffect(() => {
        matService.getAll().then((res) => setMateriales(res))
        categoriaService.getAll().then((res) => setCategorias(res.data))
    }, [])

    const handleChange = (e) => {
        setNewMaterial({
            ...newMaterial,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        matService.create(newMaterial).then((res) => {
            setMateriales([...materiales, res.data])
            setNewMaterial({
                nombre_material: '',
                inventario: '',
                precio_compra: '',
                precio_venta: '',
                id_categoria: '',
            })
        })
    }

    const handleDelete = (id) => {
        matService.delete(id).then(() => {
            setMateriales(
                materiales.filter((material) => material.id_material !== id)
            )
        })
    }

    const handleUpdate = (id) => {
        matService.update(id, newMaterial).then((res) => {
            setMateriales(
                materiales.map((material) =>
                    material.id_material === id ? res.data : material
                )
            )
        })
    }

    function formatMateriales(data) {
        if (!data) return []
        const materiales = data

        if (!materiales.data) return []

        return materiales.data.map((material) => [
            material.nombre_material,
            material.inventario,
            material.precio_compra,
            material.precio_venta,
            material.id_categoria,
            <div key={material.id_material}>
                <button
                    onClick={() => handleDelete(material.id_material)}
                    key={material.id_material}
                >
                    Eliminar
                </button>

                <button
                    onClick={() => handleUpdate(material.id_material)}
                    key={material.id_material}
                >
                    Editar
                </button>
            </div>,
        ])
    }
    const editMaterial=(id)=>{

    return (
        <div>
            <h1>Materiales</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nombre_material"
                    value={newMaterial.nombre_material}
                    onChange={handleChange}
                    placeholder="Nombre"
                />
                <input
                    type="number"
                    name="inventario"
                    value={newMaterial.inventario}
                    onChange={handleChange}
                    placeholder="Stock"
                />
                <input
                    type="number"
                    name="precio_compra"
                    value={newMaterial.precio_compra}
                    onChange={handleChange}
                    placeholder="Precio de compra"
                />
                <input
                    type="number"
                    name="precio_venta"
                    value={newMaterial.precio_venta}
                    onChange={handleChange}
                    placeholder="Precio de venta"
                />
                <select name="id_categoria" onChange={handleChange}>
                    <option value="">Seleccione una categoria</option>
                    {categorias.map((categoria) => (
                        <option
                            key={categoria.id_categoria}
                            value={categoria.id_categoria}
                        >
                            {categoria.nombre_categoria}
                        </option>
                    ))}
                </select>
                <button type="submit">Agregar</button>
            </form>

            <DataTable
                data={formatMateriales(materiales)}
                className="table table-striped"
                options={{
                    columns: [
                        { title: 'Nombre' },
                        { title: 'Stock' },
                        { title: 'Precio de compra' },
                        { title: 'Precio de venta' },
                        { title: 'Categoria' },
                        { title: 'Acciones', orderable: false },
                    ],
                }}
                slots={{
                    5: (row) => <td>{row}</td>,
                }}
            ></DataTable>
        </div>
    )
}

export default Materiales
