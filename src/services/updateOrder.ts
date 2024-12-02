import { Order } from '../types/Order';
import api from './api';

interface Body {
  id: string;
  body: Partial<Order>;
}

export default function updateOrder(
  { id, body }: Body,
): Promise<Order> {
  return api.patch(`orders/${id}`, body).then(
    response => {
      return response.data
    },
    error => {
      return error.response.status
    },
  )
}
