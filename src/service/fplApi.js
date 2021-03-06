import axios from 'axios'

const createAxiosInstance = () => {
  let config = axios.create({
    baseURL: process.env.VUE_APP_FPL_API_URL
  })

  return config
}

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
}

const responseHandler = (response) => {
  return {
    error: false,
    status: response.status,
    statusText: response.statusText,
    data: response.data
  }
}
const errorHandler = (error) => {
  return {
    error: true,
    status: error.response.status,
    statusText: error.response.statusText,
    data: error.response.data
  }
}

export default {
  axiosInstance: createAxiosInstance(),

  async getBootstrapData () {
    try {
      let response = await this.axiosInstance.get(`/api/bootstrap-static/`, headers)
      return responseHandler(response)
    } catch (error) {
      return errorHandler(error)
    }
  },
  async getFixturesData () {
    try {
      let response = await this.axiosInstance.get(`/api/fixtures/`, headers)
      return responseHandler(response)
    } catch (error) {
      return errorHandler(error)
    }
  }
}
