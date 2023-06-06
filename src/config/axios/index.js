import axios from 'axios'
axios.defaults.withCredentials = true
const axiosInstance = axios.create({
  baseURL: 'https://epic-movie-quotes-api.rati-rukhadze.redberryinternship.ge',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*'
  }
})

export default axiosInstance
