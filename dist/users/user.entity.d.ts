export declare enum Role {
    USER = "USER",
    DEVELOPER = "DEVELOPER",
    ADMIN = "ADMIN"
}
export declare class User {
    id: number;
    nombre: string;
    username: string;
    password: string;
    role: Role;
}
