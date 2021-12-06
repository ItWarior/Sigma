interface UserInterface {
  name: string;
  email: string;
  password: string;
  age: number;
  roles: string;
}

interface PostInterface {
  userId: object;
  text: string;
  updateUp: string;
}

interface SessionInterface {
  refreshToken: string;
  user: object;
}

export { UserInterface, PostInterface, SessionInterface };
