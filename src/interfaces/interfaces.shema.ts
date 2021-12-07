interface UserInterface {
  name: string;
  email: string;
  password: string;
  age: number;
  roles: string;
}

interface PostInterface {
  text: string;
  userId: object;
  updateUp: string;
}

interface SessionInterface {
  refreshToken: string;
  user: object;
}

export { UserInterface, PostInterface, SessionInterface };
