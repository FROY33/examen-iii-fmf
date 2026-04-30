import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
export declare class AlbumsController {
    private svc;
    constructor(svc: AlbumsService);
    findAll(): Promise<import("./album.entity").Album[]>;
    create(dto: CreateAlbumDto): Promise<import("./album.entity").Album>;
    update(id: number, dto: UpdateAlbumDto): Promise<import("./album.entity").Album>;
    remove(id: number): Promise<void>;
}
