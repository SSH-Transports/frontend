import { Order } from '../types/Order'
import api from './api'

export default function getOrderById(id: string): Promise<Order> {
  return api.get(`orders/${id}`).then(
    response => {
      return response.data
    },
    error => {
      return error.response.status
    },
  )
}
