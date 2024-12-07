import React, { useEffect, useState } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';
import { comunasService, userService } from '../services/api.js';
import { Modal, Button, Form } from 'react-bootstrap'
import './Usuarios.css';

DataTable.use(DT);

const Usuarios = () => {
  const [comunas, setComunas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [newUsuario, setNewUsuario] = useState({
    rut: '',
    str_nombre: '',
    mail: '',
    clave: '',
    rol: '',
    str_dir: '',
    id_co: '',
  })
  const [selectedUsuario, setSelectedUsuario] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    userService.getAll().then((res) => {
      setUsuarios(res.data);
    }).catch((error) => {
      console.error('Error al cargar usuarios:', error);
    });
    comunasService.getAll().then((res) => {
      setComunas(res.data)
    })
  }, []);

  const handleChange = (e) => {
    setNewUsuario({
      ...newUsuario,
      [e.target.name]: e.target.value,
    });
  };
  const handleEditChange = (e) => {
    setSelectedUsuario({
      ...selectedUsuario,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    userService.create(newUsuario).then((res) => {
      setUsuarios([...usuarios, res.data]);
      setNewUsuario({
        rut: '',
        str_nombre: '',
        mail: '',
        clave: '',
        rol: '',
        str_dir: '',
        id_co: '',
      });
    });
  };

  const handleDelete = (rut) => {
    userService.delete(rut).then(() => {
      setUsuarios(usuarios.filter((usuario) => usuario.rut !== rut));
    });
  };

  const handleUpdate = (rut) => {
    
    userService.
      update(selectedUsuario.rut, selectedUsuario).
      then((res) => window.location.reload());
  };

  const openEditModal = (usuario) => {
    setSelectedUsuario(usuario)
    setShowModal(true)
  }

  function formatUsuarios(data) {
    if (!data || !Array.isArray(data)) return []; // Validación de datos

    return data.map((usuario) => [
      usuario.rut,
      usuario.str_nombre,
      usuario.mail,
      usuario.rol,
      usuario.str_dir,
      usuario.str_co,
      // Aquí renderizamos las acciones de manera válida
      <div className="d-flex gap-2">
        <Button
          variant="primary"
          onClick={() => openEditModal(usuario)}
        >
          Editar
        </Button>
        <Button
          variant="danger"
          onClick={() => handleDelete(usuario.rut)}
        >
          Eliminar
        </Button>
      </div>,
    ]);
  }

  return (
    <div style={{ paddingLeft: '5%', paddingRight: '5%' }}>
      <h1>Usuarios</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="rut"
          value={newUsuario.rut}
          onChange={handleChange}
          placeholder="RUT"
          required
        />
        <input
          type="text"
          name="str_nombre"
          value={newUsuario.str_nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        <input
          type="email"
          name="mail"
          value={newUsuario.mail}
          onChange={handleChange}
          placeholder="Correo"
          required
        />
        <input
          type="password"
          name="clave"
          value={newUsuario.clave}
          onChange={handleChange}
          placeholder="Clave"
          required
        />
        <select
          name="rol"
          value={newUsuario.rol}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un rol</option>
          <option value="cliente">Cliente</option>
          <option value="jefe">Jefe</option>
          <option value="trabajador">Trabajador</option>
        </select>
        <input
          type="text"
          name="str_dir"
          value={newUsuario.str_dir}
          onChange={handleChange}
          placeholder="Dirección"
          required
        />
        <select
          name="id_co"
          value={newUsuario.id_co}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione una comuna</option>
          {comunas.map((co) => (
            <option value={co.id_co}>{co.str_co}</option>
          ))}
        </select>

        <button type="submit" className="btn btn-primary">
          Agregar
        </button>
      </form>

      <DataTable
        data={formatUsuarios(usuarios)}
        className="table table-striped"
        options={{
          columns: [
            { title: 'RUT' },
            { title: 'Nombre' },
            { title: 'Correo' },
            { title: 'Rol' },
            { title: 'Dirección' },
            { title: 'Comuna Residencial' },
            { title: 'Acciones', orderable: false },
          ],
        }}
        slots={{
          6: (row) => <td>{row}</td>,
        }}
      ></DataTable>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>RUT</Form.Label>
              <Form.Control
                type="text"
                name="rut"
                value={selectedUsuario?.rut || ''}
                onChange={handleEditChange}
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="str_nombre"
                value={selectedUsuario?.str_nombre || ''}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="text"
                name="mail"
                value={selectedUsuario?.mail || ''}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Rol</Form.Label>
              <Form.Control
                as="select"
                name="rol"
                value={selectedUsuario?.rol || ''}
                onChange={handleEditChange}
              >
                <option value="">Seleccione un rol</option>
                <option value="cliente">Cliente</option>
                <option value="jefe">Jefe</option>
                <option value="trabajador">Trabajador</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Direccion</Form.Label>
              <Form.Control
                type="text"
                name="str_dir"
                value={selectedUsuario?.str_dir || ''}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Comuna</Form.Label>
              <Form.Control
                as="select"
                name="id_co"
                value={selectedUsuario?.id_co || ''}
                onChange={handleEditChange}
              >
                <option value="">Seleccione una comuna</option>
                {comunas.map((co) => (
                  <option value={co.id_co}>{co.str_co}</option>
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
    </div>
  );
};

export default Usuarios;
