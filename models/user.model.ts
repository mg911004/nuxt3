export interface User {
  id: number;
  userId: string;
  username: string;
  email: string;
  name: string;
  permissions: string[];
  roles: string[];
  menus: string[];
}

export interface UserList {
  users: User[];
  total: number;
}
