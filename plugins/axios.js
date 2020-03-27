import axios from 'axios'

export default axios.create({
  baseURL: 'https://web-api.baho.ml',
  withCredentials: true
})
