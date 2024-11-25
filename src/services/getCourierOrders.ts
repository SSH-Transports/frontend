import { Order } from '../types/Order'
import api from './api'

export default function getCourierOrders(id: string): Promise<Order[]> {
  return api.get(`orders/user/${id}`).then(
    response => {
      return response.data
    },
    error => {
      return error.response.status
    },
  )
}
