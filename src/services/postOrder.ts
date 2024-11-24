import api from './api'
import { Order } from '../types/Order'

export default function postOrder(body: Order): Promise<Order> {
  return api.post(`orders`, body).then(
    response => {
      return response.data
    },
    error => {
      return error.response.status
    },
  )
}
