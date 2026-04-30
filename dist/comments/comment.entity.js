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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const typeorm_1 = require("typeorm");
const photo_entity_1 = require("../photos/photo.entity");
let Comment = class Comment {
    ID;
    photo;
    PhotoID;
    PostDate;
    Content;
};
exports.Comment = Comment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Comment.prototype, "ID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => photo_entity_1.Photo, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'PhotoID' }),
    __metadata("design:type", photo_entity_1.Photo)
], Comment.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Comment.prototype, "PhotoID", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Comment.prototype, "PostDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Comment.prototype, "Content", void 0);
exports.Comment = Comment = __decorate([
    (0, typeorm_1.Entity)('Comment')
], Comment);
//# sourceMappingURL=comment.entity.js.map