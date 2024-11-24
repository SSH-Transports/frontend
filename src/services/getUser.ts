import { User } from '../types/User'
import api from './api'

export default function getUser(id: string): Promise<User> {
  return api.get(`users/${id}`).then(
    response => {
      return response.data
    },
    error => {
      return error.response.status
    },
  )
}
