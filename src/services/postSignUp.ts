import api from './api'
import { User } from '../types/User'

export default function postSignUp(body: User): Promise<User> {
  return api.post(`users`, body).then(
    response => {
      return response.data
    },
    error => {
      return error.response.status
    },
  )
}
