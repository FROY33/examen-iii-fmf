import { Repository } from 'typeorm';
import { Location } from './location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
export declare class LocationsService {
    private repo;
    constructor(repo: Repository<Location>);
    create(dto: CreateLocationDto): Promise<Location>;
    findAll(): Promise<Location[]>;
    findOne(id: number): Promise<Location>;
    update(id: number, dto: UpdateLocationDto): Promise<Location>;
    remove(id: number): Promise<void>;
}
