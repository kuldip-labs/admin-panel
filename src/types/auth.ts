export interface User {
    userId: string;
    role: 'user' | 'admin';
  }
  
  export interface AuthContextType {
    user: User | null;
    login: (accessToken: string) => void;
    logout: () => void;
  }