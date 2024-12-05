import React, { useEffect, useState } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';
import { userService } from '../services/api.js'; 
import './Usuarios.css';

DataTable.use(DT);

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [newUsuario, setNewUsuario] = useState({
    rut: '',
    str_nombre: '',
    mail: '',
    clave: '',
    rol: '',
    str_dir: '',
    id_co: '',
  });

  useEffect(() => {
    console.log('El useEffect se está ejecutando');
    userService.getAll().then((res) => {
      console.log('Datos recibidos desde la API:', res.data);
      setUsuarios(res.data);
    }).catch((error) => {
      console.error('Error al cargar usuarios:', error);
    });
  }, []);

  const handleChange = (e) => {
    setNewUsuario({
      ...newUsuario,
      [e.target.name]: e.target.value,
    });
  };

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
    userService.update(rut, newUsuario).then((res) => {
      setUsuarios(
        usuarios.map((usuario) => (usuario.rut === rut ? res.data : usuario))
      );
    });
  };

  // Formatear los datos para la tabla
  function formatUsuarios (data) {
    if (!data) return [];
    const usuarios = data
    if (!usuarios.data) return []
    
    return usuarios.data.map((usuario) => [
      usuario.rut,
      usuario.str_nombre,
      usuario.mail,
      usuario.rol,
      usuario.str_dir,
      usuario.id_co,
      <div>
        <button onClick={() => handleDelete(usuario.rut)}>
            Eliminar
        </button>
        <button onClick={() => handleUpdate(usuario.rut)}>
            Editar
        </button>
      </div>,
    ]);
  };

  return (
    <div>
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
        <input
          type="number"
          name="id_co"
          value={newUsuario.id_co}
          onChange={handleChange}
          placeholder="ID de Comuna"
          required
        />
        <button type="submit" className="btn btn-primary">
          Agregar
        </button>
      </form>

      {/* Tabla para mostrar los usuarios */}
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
            { title: 'ID de Comuna' },
            { title: 'Acciones', orderable: false },
          ],
        }}
        slots={{
            5: (row) => <td>{row}</td>,
        }}
      ></DataTable>
    </div>
  );
};

export default Usuarios;
