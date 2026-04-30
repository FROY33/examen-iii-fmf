import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
export declare class PhotosController {
    private svc;
    constructor(svc: PhotosService);
    findAll(req: any): Promise<import("./photo.entity").Photo[]>;
    create(dto: CreatePhotoDto): Promise<import("./photo.entity").Photo>;
    update(id: number, dto: UpdatePhotoDto): Promise<import("./photo.entity").Photo>;
    remove(id: number): Promise<void>;
}
