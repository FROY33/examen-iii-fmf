import { Privacy } from '../photo.entity';
export declare class CreatePhotoDto {
    AlbumID?: number;
    LocationID?: number;
    MemberID?: number;
    Title: string;
    Description?: string;
    Privacy?: Privacy;
    ImagePath?: string;
    tagIds?: number[];
}
