import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
export declare class MembersController {
    private svc;
    constructor(svc: MembersService);
    findAll(): Promise<import("./member.entity").Member[]>;
    create(dto: CreateMemberDto): Promise<import("./member.entity").Member>;
    update(id: number, dto: UpdateMemberDto): Promise<import("./member.entity").Member>;
    remove(id: number): Promise<void>;
}
