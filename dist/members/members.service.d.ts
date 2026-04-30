import { Repository } from 'typeorm';
import { Member } from './member.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
export declare class MembersService {
    private repo;
    constructor(repo: Repository<Member>);
    create(dto: CreateMemberDto): Promise<Member>;
    findAll(): Promise<Member[]>;
    findOne(id: number): Promise<Member>;
    update(id: number, dto: UpdateMemberDto): Promise<Member>;
    remove(id: number): Promise<void>;
}
