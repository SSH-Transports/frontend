import { Socket } from "socket.io-client";
import { OrderStatus } from "../services/getOrders";
import { NotificationStatus, NotificationType } from "../types/Notification";
import { User } from "../types/User";

export interface ChangeStatus {
  socket: Socket;
  user?: User;
  orderId: string;
  orderStatus: OrderStatus;
}

export const changeStatus = async ({
  socket,
  user,
  orderId,
  orderStatus,
}: ChangeStatus) => {
  const { title, message } = {
    [OrderStatus.SEPARATING]: {
      title: 'Entrega Aceita',
      message: `Entrega foi aceita`,
    },
    [OrderStatus.REFUSED]: {
      title: 'Entrega Recusada',
      message: `Entrega foi recusada`,
    },
    [OrderStatus.WAITING_RESPONSE]: {
      title: 'Entrega Pendente',
      message: `Entrega está pendente`,
    },
    [OrderStatus.DELIVERED]: {
      title: 'Entrega Realizada',
      message: `Entrega foi realizada`,
    },
    [OrderStatus.ON_THE_WAY]: {
      title: 'Entrega a caminho',
      message: `A entrega está a caminho`,
    },
  }[orderStatus];

  socket.emit('sendNotification', {
    title,
    message,
    type: NotificationType.ORDER,
    status: NotificationStatus.UNREAD,
    link: `/order/${orderId}`,
    userId: user?.id,
    orderId,
    orderStatus
  });
}