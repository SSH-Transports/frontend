import { User } from "./User";

export enum NotificationStatus {
  READ = "READ",
  UNREAD = "UNREAD"
}

export enum NotificationType {
  ORDER = "ORDER",
  MESSAGE = "MESSAGE"
}

export interface Notification {
  id?: string;
  title: string;
  link?: string;
  message: string;
  status: NotificationStatus;
  type: NotificationType;
  createdAt?: string;
  updatedAt?: string;
  userId: string;
  user: User;
}