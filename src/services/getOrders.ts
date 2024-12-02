import api from './api'

export enum OrderStatus {
    WAITING_RESPONSE = 'WAITING_RESPONSE',
    SEPARATING = 'SEPARATING',
    ON_THE_WAY = 'ON_THE_WAY',
    DELIVERED = 'DELIVERED',
    REFUSED = 'REFUSED'
};

interface Order {
    id?: string
    latitude: number
    longitude: number
    weight: string
    time: string
    distance: string
    cost: number
    status: OrderStatus
    adminId?: string
    courierId?: string
    customerId: string   
}


export default function getOrders(): Promise<Order[]> {
  return api.get('orders').then(
    response => {
      return response.data
    },
    error => {
      return error.response.status
    },
  )
}
