import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
export declare class TagsController {
    private svc;
    constructor(svc: TagsService);
    findAll(): Promise<import("./tag.entity").Tag[]>;
    create(dto: CreateTagDto): Promise<import("./tag.entity").Tag>;
    update(id: number, dto: UpdateTagDto): Promise<import("./tag.entity").Tag>;
    remove(id: number): Promise<void>;
}
