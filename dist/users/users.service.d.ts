import { OnApplicationBootstrap } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User, Role } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService implements OnApplicationBootstrap {
    private usersRepo;
    private configService;
    constructor(usersRepo: Repository<User>, configService: ConfigService);
    onApplicationBootstrap(): Promise<void>;
    create(dto: CreateUserDto): Promise<User>;
    findAll(currentUser: {
        id: number;
        role: Role;
    }): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, dto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<void>;
    assignRole(id: number, role: Role): Promise<User>;
}
