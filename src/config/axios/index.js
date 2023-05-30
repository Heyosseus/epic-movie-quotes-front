import axios from 'axios'
import { getCookie } from './helpers'

const token = getCookie('token')

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*'
  }
})

export default axiosInstance
