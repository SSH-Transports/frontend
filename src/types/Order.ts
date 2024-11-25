export enum OrderStatus {
  WAITING_RESPONSE = 'WAITING_RESPONSE',
  SEPARATING = 'SEPARATING',
  ON_THE_WAY = 'ON_THE_WAY',
  DELIVERED = 'DELIVERED',
  REFUSED = 'REFUSED'
};

export const OrderStatusNames = {
  WAITING_RESPONSE: 'Aguardando Resposta',
  SEPARATING: 'Separando',
  ON_THE_WAY: 'A Caminho',
  DELIVERED: 'Entregue',
  REFUSED: 'Recusada'
};

export interface Order {
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
  createdAt?: string
  updatedAt?: string
}