export interface User {
    userId: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    role: string;
    classProfessor?: boolean;
}