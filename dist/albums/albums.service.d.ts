import { Repository } from 'typeorm';
import { Album } from './album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
export declare class AlbumsService {
    private repo;
    constructor(repo: Repository<Album>);
    create(dto: CreateAlbumDto): Promise<Album>;
    findAll(): Promise<Album[]>;
    findOne(id: number): Promise<Album>;
    update(id: number, dto: UpdateAlbumDto): Promise<Album>;
    remove(id: number): Promise<void>;
}
