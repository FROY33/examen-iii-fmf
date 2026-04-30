import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findAll(req: any): Promise<import("./user.entity").User[]>;
    create(dto: CreateUserDto): Promise<import("./user.entity").User>;
    update(id: number, dto: UpdateUserDto): Promise<import("./user.entity").User>;
    assignRole(id: number, dto: AssignRoleDto): Promise<import("./user.entity").User>;
    remove(id: number): Promise<void>;
}
