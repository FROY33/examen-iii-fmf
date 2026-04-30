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
exports.AlbumsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const album_entity_1 = require("./album.entity");
let AlbumsService = class AlbumsService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    create(dto) { return this.repo.save(this.repo.create(dto)); }
    findAll() { return this.repo.find(); }
    async findOne(id) {
        const album = await this.repo.findOne({ where: { ID: id } });
        if (!album)
            throw new common_1.NotFoundException(`Album ${id} not found`);
        return album;
    }
    async update(id, dto) {
        const album = await this.findOne(id);
        Object.assign(album, dto);
        return this.repo.save(album);
    }
    async remove(id) {
        const album = await this.findOne(id);
        await this.repo.remove(album);
    }
};
exports.AlbumsService = AlbumsService;
exports.AlbumsService = AlbumsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(album_entity_1.Album)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AlbumsService);
//# sourceMappingURL=albums.service.js.map