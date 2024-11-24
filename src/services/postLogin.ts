import api from './api'

interface Login {
  email: string
  password: string
  isFromMobile: boolean
}

export default function postLogin(
  body: Login,
): Promise<{ access_token: string }> {
  return api.post(`auth/login`, body).then(
    response => {
      return response.data
    },
    error => {
      return error.response.status
    },
  )
}
