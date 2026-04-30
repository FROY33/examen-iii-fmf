import { Photo } from '../photos/photo.entity';
export declare class Comment {
    ID: number;
    photo: Photo;
    PhotoID: number;
    PostDate: Date;
    Content: string;
}
