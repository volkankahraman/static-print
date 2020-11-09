import { Role } from './Role';

export class User {
    id: string;
    displayName: string;
    email: string;
    username: string;
    role: Role[];
}