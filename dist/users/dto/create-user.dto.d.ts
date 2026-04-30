import { Role } from '../user.entity';
export declare class CreateUserDto {
    nombre: string;
    username: string;
    password: string;
    role?: Role;
}
