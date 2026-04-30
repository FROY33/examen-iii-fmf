"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const photo_entity_1 = require("./photo.entity");
const tag_entity_1 = require("../tags/tag.entity");
const user_entity_1 = require("../users/user.entity");
let PhotosService = class PhotosService {
    repo;
    tagsRepo;
    constructor(repo, tagsRepo) {
        this.repo = repo;
        this.tagsRepo = tagsRepo;
    }
    async create(dto) {
        const { tagIds, ...rest } = dto;
        const photo = this.repo.create({ ...rest, UploadDate: new Date() });
        if (tagIds?.length) {
            photo.tags = await this.tagsRepo.findByIds(tagIds);
        }
        return this.repo.save(photo);
    }
    findAll(currentUser) {
        if (currentUser.role === user_entity_1.Role.USER) {
            return this.repo.find({ where: { Privacy: photo_entity_1.Privacy.PUBLIC } });
        }
        return this.repo.find();
    }
    async findOne(id) {
        const photo = await this.repo.findOne({ where: { ID: id } });
        if (!photo)
            throw new common_1.NotFoundException(`Photo ${id} not found`);
        return photo;
    }
    async update(id, dto) {
        const photo = await this.findOne(id);
        const { tagIds, ...rest } = dto;
        Object.assign(photo, rest);
        if (tagIds !== undefined) {
            photo.tags = tagIds.length ? await this.tagsRepo.findByIds(tagIds) : [];
        }
        return this.repo.save(photo);
    }
    async remove(id) {
        const photo = await this.findOne(id);
        await this.repo.remove(photo);
    }
};
exports.PhotosService = PhotosService;
exports.PhotosService = PhotosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(photo_entity_1.Photo)),
    __param(1, (0, typeorm_1.InjectRepository)(tag_entity_1.Tag)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PhotosService);
//# sourceMappingURL=photos.service.js.map