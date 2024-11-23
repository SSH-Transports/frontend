export enum UserRoles {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
  COURIER = 'COURIER',
  CUSTOMER = 'CUSTOMER'
}

export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: UserRoles;
}
