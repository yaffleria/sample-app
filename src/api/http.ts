import axios from 'axios'

export const httpClient = axios.create({
  baseURL: import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE_URL,
})

// Request interceptor for logging
httpClient.interceptors.request.use(
  (config) => {
    console.log(`[HTTP Request] ${config.method?.toUpperCase()} ${config.url}`, {
      baseURL: config.baseURL,
      params: config.params,
      data: config.data,
    })
    return config
  },
  (error) => {
    console.error('[HTTP Request Error]', error)
    // TODO: Send to Sentry in the future
    return Promise.reject(error)
  }
)

// Response interceptor for logging
httpClient.interceptors.response.use(
  (response) => {
    console.log(`[HTTP Response] ${response.status} ${response.config.url}`, {
      data: response.data,
      headers: response.headers,
    })
    return response
  },
  (error) => {
    const { response, config } = error
    console.error(`[HTTP Response Error] ${response?.status || 'Network Error'} ${config?.url}`, {
      status: response?.status,
      statusText: response?.statusText,
      data: response?.data,
      message: error.message,
    })
    // TODO: Send error logs to Sentry in the future for monitoring and debugging
    return Promise.reject(error)
  }
)
