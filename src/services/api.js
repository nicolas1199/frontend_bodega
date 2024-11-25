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
    login: (mail, clave) => api.post('/login', { mail, clave }),
    logout: () => api.post('/logout'),
}
