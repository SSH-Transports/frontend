import { User, UserRoles } from '../types/User'
import api from './api'

export default function getUsers(role?: UserRoles): Promise<User[]> {
  return api.get(`users`, {
    params: {
      role,
    }
  }).then(
    response => {
      return response.data
    },
    error => {
      return error.response.status
    },
  )
}
