import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentsController {
    private svc;
    constructor(svc: CommentsService);
    findAll(): Promise<import("./comment.entity").Comment[]>;
    create(dto: CreateCommentDto): Promise<import("./comment.entity").Comment>;
    update(id: number, dto: UpdateCommentDto): Promise<import("./comment.entity").Comment>;
    remove(id: number): Promise<void>;
}
