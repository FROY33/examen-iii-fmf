"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./users/user.entity");
const member_entity_1 = require("./members/member.entity");
const album_entity_1 = require("./albums/album.entity");
const location_entity_1 = require("./locations/location.entity");
const tag_entity_1 = require("./tags/tag.entity");
const photo_entity_1 = require("./photos/photo.entity");
const comment_entity_1 = require("./comments/comment.entity");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const members_module_1 = require("./members/members.module");
const albums_module_1 = require("./albums/albums.module");
const locations_module_1 = require("./locations/locations.module");
const tags_module_1 = require("./tags/tags.module");
const photos_module_1 = require("./photos/photos.module");
const comments_module_1 = require("./comments/comments.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'mysql',
                    host: config.get('DB_HOST'),
                    port: config.get('DB_PORT'),
                    username: config.get('DB_USER'),
                    password: config.get('DB_PASSWORD'),
                    database: config.get('DB_NAME'),
                    entities: [user_entity_1.User, member_entity_1.Member, album_entity_1.Album, location_entity_1.Location, tag_entity_1.Tag, photo_entity_1.Photo, comment_entity_1.Comment],
                    synchronize: true,
                }),
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            members_module_1.MembersModule,
            albums_module_1.AlbumsModule,
            locations_module_1.LocationsModule,
            tags_module_1.TagsModule,
            photos_module_1.PhotosModule,
            comments_module_1.CommentsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map