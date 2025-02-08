// Define la interfaz para el usuario autenticado
export interface UserInterface {
    id: number;
    name: string;
    email: string;
    role: string;
  }
  
export interface AuthInterface { 
    user: UserInterface | null;
    token: string | null;
}