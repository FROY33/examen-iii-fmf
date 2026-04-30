import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { Tag } from '../tags/tag.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Role } from '../users/user.entity';
export declare class PhotosService {
    private repo;
    private tagsRepo;
    constructor(repo: Repository<Photo>, tagsRepo: Repository<Tag>);
    create(dto: CreatePhotoDto): Promise<Photo>;
    findAll(currentUser: {
        role: Role;
    }): Promise<Photo[]>;
    findOne(id: number): Promise<Photo>;
    update(id: number, dto: UpdatePhotoDto): Promise<Photo>;
    remove(id: number): Promise<void>;
}
