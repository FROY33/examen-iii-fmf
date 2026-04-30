import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Member } from './members/member.entity';
import { Album } from './albums/album.entity';
import { Location } from './locations/location.entity';
import { Tag } from './tags/tag.entity';
import { Photo } from './photos/photo.entity';
import { Comment } from './comments/comment.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MembersModule } from './members/members.module';
import { AlbumsModule } from './albums/albums.module';
import { LocationsModule } from './locations/locations.module';
import { TagsModule } from './tags/tags.module';
import { PhotosModule } from './photos/photos.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [User, Member, Album, Location, Tag, Photo, Comment],
        synchronize: true,
      }),
    }),
    AuthModule,
    UsersModule,
    MembersModule,
    AlbumsModule,
    LocationsModule,
    TagsModule,
    PhotosModule,
    CommentsModule,
  ],
})
export class AppModule {}
