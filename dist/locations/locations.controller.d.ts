import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
export declare class LocationsController {
    private svc;
    constructor(svc: LocationsService);
    findAll(): Promise<import("./location.entity").Location[]>;
    create(dto: CreateLocationDto): Promise<import("./location.entity").Location>;
    update(id: number, dto: UpdateLocationDto): Promise<import("./location.entity").Location>;
    remove(id: number): Promise<void>;
}
