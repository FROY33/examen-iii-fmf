import { Album } from '../albums/album.entity';
import { Location } from '../locations/location.entity';
import { Member } from '../members/member.entity';
import { Tag } from '../tags/tag.entity';
export declare enum Privacy {
    PUBLIC = "public",
    PRIVATE = "private"
}
export declare class Photo {
    ID: number;
    album: Album;
    AlbumID: number;
    location: Location;
    LocationID: number;
    member: Member;
    MemberID: number;
    Title: string;
    Description: string;
    Privacy: Privacy;
    UploadDate: Date;
    View: number;
    ImagePath: string;
    tags: Tag[];
}
