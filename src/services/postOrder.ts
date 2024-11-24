import api from './api';
import { Order } from '../types/Order';

export default function postOrder(body: Order): Promise<Order> {
  return api.post(`orders`, body).then(
    response => response.data,
    error => {
      if (error.response) {
        throw new Error(error.response.data.message || `Erro ${error.response.status}: Falha na criação do pedido`);
      } else {
        throw new Error('Erro de conexão com o servidor');
      }
    },
  );
}
