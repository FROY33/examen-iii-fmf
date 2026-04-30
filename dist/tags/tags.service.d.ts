import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
export declare class TagsService {
    private repo;
    constructor(repo: Repository<Tag>);
    create(dto: CreateTagDto): Promise<Tag>;
    findAll(): Promise<Tag[]>;
    findOne(id: number): Promise<Tag>;
    findByIds(ids: number[]): Promise<Tag[]>;
    update(id: number, dto: UpdateTagDto): Promise<Tag>;
    remove(id: number): Promise<void>;
}
