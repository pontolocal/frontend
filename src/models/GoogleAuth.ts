export interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  sub: string;
}

export interface AuthContextType {
  user: GoogleUser | null;
  login: () => void;
  logout: () => void;
  loading: boolean;
}