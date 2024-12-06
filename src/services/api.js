import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    withCredentials: true,
})

export const authService = {
    login: (mail, clave) => api.post('/login', { mail, clave }),
    logout: () => api.post('/logout'),
}
export const logedService = {
    getData: () => api.get('/loged/materiales'),
}

export const cartService = {
    create: (material, rut) =>
        api.get(
            (`/materiales/a_carrito/?/?/?/?/`,
            [
                rut,
                material.id_material,
                material.cantidad,
                material.precio_venta,
            ])
        ),
}
export const matService = {
    create: (material) => api.post('/loged/materiales/create', material),
    getAll: () => api.get('/loged/materiales'),
    update: (id, nuevo) => api.put(`/loged/materiales/update/${id}`, nuevo),
    delete: (id) => api.delete(`/loged/materiales/delete/${id}`),
}

export const categoriaService = {
    create: (categoria) => api.post('loged/categorias/create', categoria),
    getAll: () => api.get('/loged/categorias'),
    update: (id, nuevo) => api.get((`loged/categorias/update/?`, [id]), nuevo),
    delete: (id) => api.delete((`loged/categorias/?`, [id])),
}

export const userService = {
    create: (newUsuario) => api.post('/loged/usuarios/create', newUsuario),
    getAll: () => api.get('/loged/usuarios'),
    update: (rut, updatedUsuario) =>
        api.put(`/loged/usuarios/update/${rut}`, updatedUsuario),
    delete: (rut) => api.delete(`/loged/usuarios/delete/${rut}`),
}

export const sessionService = {
    getSession: (sessionID) => api.post('/loged/session', { sessionID }),
}

export const obtenerUsuarios = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/loged/usuarios')
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`)
        }
        return await response.json()
    } catch (error) {
        console.error('Error al obtener los usuarios:', error)
        return []
    }
}

export default api
