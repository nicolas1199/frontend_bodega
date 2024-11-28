import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Ajusta esta URL a la de tu backend
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export const authService = {
    login: (mail, clave) => api.post('/login/verif', { mail, clave }),
    logout: () => api.post('/logout'),
}
export const logedService = {
    getData: ()=> api.get('/loged/materiales')
}
export const cartService = {
    create: (material,rut)=>api.get((`/materiales/a_carrito/?/?/?/?/`,
        [rut,material.id_material,material.cantidad,material.precio_venta]))

}
export const matService ={
    create: (material)=>api.post(`materiales/create`,material),
    update: (id,nuevo) => api.get((`materiales/update/?`,[id]),nuevo),
    delete: (id) => api.delete((`materiales/?`,[id]))
}