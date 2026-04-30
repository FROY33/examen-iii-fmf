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
exports.Photo = exports.Privacy = void 0;
const typeorm_1 = require("typeorm");
const album_entity_1 = require("../albums/album.entity");
const location_entity_1 = require("../locations/location.entity");
const member_entity_1 = require("../members/member.entity");
const tag_entity_1 = require("../tags/tag.entity");
var Privacy;
(function (Privacy) {
    Privacy["PUBLIC"] = "public";
    Privacy["PRIVATE"] = "private";
})(Privacy || (exports.Privacy = Privacy = {}));
let Photo = class Photo {
    ID;
    album;
    AlbumID;
    location;
    LocationID;
    member;
    MemberID;
    Title;
    Description;
    Privacy;
    UploadDate;
    View;
    ImagePath;
    tags;
};
exports.Photo = Photo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Photo.prototype, "ID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => album_entity_1.Album, { nullable: true, eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'AlbumID' }),
    __metadata("design:type", album_entity_1.Album)
], Photo.prototype, "album", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Photo.prototype, "AlbumID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => location_entity_1.Location, { nullable: true, eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'LocationID' }),
    __metadata("design:type", location_entity_1.Location)
], Photo.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Photo.prototype, "LocationID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => member_entity_1.Member, { nullable: true, eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'MemberID' }),
    __metadata("design:type", member_entity_1.Member)
], Photo.prototype, "member", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Photo.prototype, "MemberID", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 120 }),
    __metadata("design:type", String)
], Photo.prototype, "Title", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Photo.prototype, "Description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: Privacy.PUBLIC }),
    __metadata("design:type", String)
], Photo.prototype, "Privacy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Photo.prototype, "UploadDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Photo.prototype, "View", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Photo.prototype, "ImagePath", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => tag_entity_1.Tag, (tag) => tag.photos, { cascade: true, eager: true }),
    (0, typeorm_1.JoinTable)({
        name: 'Tag_Photo',
        joinColumn: { name: 'PhotoID', referencedColumnName: 'ID' },
        inverseJoinColumn: { name: 'TagID', referencedColumnName: 'ID' },
    }),
    __metadata("design:type", Array)
], Photo.prototype, "tags", void 0);
exports.Photo = Photo = __decorate([
    (0, typeorm_1.Entity)('Photo')
], Photo);
//# sourceMappingURL=photo.entity.js.map