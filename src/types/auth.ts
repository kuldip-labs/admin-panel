export interface User {
    userId: string;
    role: 'user' | 'admin' | 'executive';
  }
  
  export interface AuthContextType {
    user: User | null;
    login: (accessToken: string) => void;
    logout: () => void;
  }