import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
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
    create: (material) => api.post(`materiales/create`, material),
    update: (id, nuevo) => api.get((`materiales/update/?`, [id]), nuevo),
    delete: (id) => api.delete((`materiales/?`, [id])),
}
