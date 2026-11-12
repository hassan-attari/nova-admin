export interface User {
  id: number;
  name: { firstname: string; lastname: string };
  username: string;
  email: string;
  phone: string;
}

export interface UserInput {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginInput {
  username: string;
  password: string;
}
