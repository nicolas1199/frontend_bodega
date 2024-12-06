import React, { useEffect, useState } from 'react'
import { matService } from '../services/api.js'
import { categoriaService } from '../services/api.js'
import DataTable from 'datatables.net-react'
import DT from 'datatables.net-bs5'
import { Modal, Button, Form, Row, Col, Container } from 'react-bootstrap'

DataTable.use(DT)

const Materiales = () => {
    const [materiales, setMateriales] = useState([])
    const [categorias, setCategorias] = useState([])
    const [newMaterial, setNewMaterial] = useState({
        nombre_material: '',
        inventario: '',
        precio_compra: '',
        precio_venta: '',
        id_categoria: '',
    })
    const [selectedMaterial, setSelectedMaterial] = useState(null)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        matService.getAll().then((res) => {
            setMateriales(res.data || [])
        })
        categoriaService.getAll().then((res) => setCategorias(res.data))
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target

        setNewMaterial((prev) => ({
            ...prev,
            [name]:
                name === 'inventario' ||
                name === 'precio_compra' ||
                name === 'precio_venta'
                    ? value.replace(/\D/, '')
                    : value,
        }))
    }

    const handleEditChange = (e) => {
        const { name, value } = e.target

        setSelectedMaterial((prev) => ({
            ...prev,
            [name]:
                name === 'inventario' ||
                name === 'precio_compra' ||
                name === 'precio_venta'
                    ? value.replace(/\D/, '')
                    : value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        matService
            .create({
                ...newMaterial,
                inventario: parseInt(newMaterial.inventario, 10),
                precio_compra: parseFloat(newMaterial.precio_compra),
                precio_venta: parseFloat(newMaterial.precio_venta),
            })
            .then((res) => {
                window.location.reload()
            })
    }

    const handleDelete = (id) => {
        matService.delete(id).then(() => {
            setMateriales(
                materiales.filter((material) => material.id_material !== id)
            )
        })
    }

    const handleUpdate = () => {
        matService
            .update(selectedMaterial.id_material, selectedMaterial)
            .then((res) => window.location.reload())
    }

    const openEditModal = (material) => {
        setSelectedMaterial(material)
        setShowModal(true)
    }

    function formatMateriales(materiales) {
        if (!materiales) return []

        return materiales.map((material) => [
            material.nombre_material,
            material.inventario,
            material.precio_compra,
            material.precio_venta,
            material.id_categoria,
            <div>
                <Button
                    variant="primary"
                    onClick={() => openEditModal(material)}
                >
                    Editar
                </Button>

                <Button
                    variant="danger"
                    onClick={() => handleDelete(material.id_material)}
                >
                    Eliminar
                </Button>
            </div>,
        ])
    }

    return (
        <Container style={{ maxWidth: '99%' }}>
            <h1>Materiales</h1>
            <Form onSubmit={handleSubmit}>
                <Row className="align-items-end">
                    <Col xs="auto" md="auto">
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre_material"
                                value={newMaterial.nombre_material}
                                placeholder="Nombre del material"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>

                    <Col xs="auto">
                        <Form.Group>
                            <Form.Label>Inventario</Form.Label>
                            <Form.Control
                                type="number"
                                name="inventario"
                                value={newMaterial.inventario}
                                placeholder="Cantidad de material"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>

                    <Col xs="auto">
                        <Form.Group>
                            <Form.Label>Precio de compra</Form.Label>
                            <Form.Control
                                type="number"
                                name="precio_compra"
                                value={newMaterial.precio_compra}
                                placeholder="Precio de compra"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>

                    <Col xs="auto">
                        <Form.Group>
                            <Form.Label>Precio de venta</Form.Label>
                            <Form.Control
                                type="number"
                                name="precio_venta"
                                value={newMaterial.precio_venta}
                                placeholder="Precio de venta"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>

                    <Col xs="auto">
                        <Form.Group>
                            <Form.Label>Categoria</Form.Label>
                            <Form.Select
                                name="id_categoria"
                                value={newMaterial.id_categoria}
                                onChange={handleChange}
                            >
                                <option value="">
                                    Seleccione una categoria
                                </option>
                                {categorias.map((categoria) => (
                                    <option
                                        value={categoria.id_categoria}
                                        key={categoria.id_categoria}
                                    >
                                        {categoria.nombre_categoria}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col xs="auto">
                        <Button type="submit">Agregar</Button>
                    </Col>
                </Row>
            </Form>

            <DataTable
                data={formatMateriales(materiales)}
                className="table table-striped"
                options={{
                    language: {
                        search: 'Buscar:',
                        lengthMenu: 'Mostrar _MENU_ elementos',
                        info: 'Mostrando _START_ a _END_ de _TOTAL_ elementos',
                        infoEmpty: 'No se encontraron elementos',
                        infoFiltered: '(filtrado de _MAX_ elementos totales)',
                        zeroRecords: 'No se encontraron elementos',
                        paginate: {
                            first: 'Primero',
                            previous: 'Anterior',
                            next: 'Siguiente',
                            last: 'Último',
                        },
                    },
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
                    5: (row) => <div>{row}</div>,
                }}
            ></DataTable>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Material</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre_material"
                                value={selectedMaterial?.nombre_material || ''}
                                onChange={handleEditChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Inventario</Form.Label>
                            <Form.Control
                                type="number"
                                name="inventario"
                                value={selectedMaterial?.inventario || ''}
                                onChange={handleEditChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Precio de compra</Form.Label>
                            <Form.Control
                                type="number"
                                name="precio_compra"
                                value={selectedMaterial?.precio_compra || ''}
                                onChange={handleEditChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Precio de venta</Form.Label>
                            <Form.Control
                                type="number"
                                name="precio_venta"
                                value={selectedMaterial?.precio_venta || ''}
                                onChange={handleEditChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Categoria</Form.Label>
                            <Form.Control
                                as="select"
                                name="id_categoria"
                                value={selectedMaterial?.id_categoria || ''}
                                onChange={handleEditChange}
                            >
                                <option value="">
                                    Seleccione una categoria
                                </option>
                                {categorias.map((categoria) => (
                                    <option
                                        value={categoria.id_categoria}
                                        key={categoria.id_categoria}
                                    >
                                        {categoria.nombre_categoria}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowModal(false)}
                    >
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default Materiales
