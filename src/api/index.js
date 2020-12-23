import axios from 'axios'

const http = axios.create({
  baseURL: 'https://c-crud-api.herokuapp.com/api/v1',
})

export default http
