import api from './api'
import { User } from '../types/User'

export default function postLogin(body: User): Promise<User> {
  return api.post(`login`, body).then(
    response => {
      return response.data
    },
    error => {
      return error.response.status
    },
  )
}
