import { INestApplication, ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { User } from '../../src/users/user.entity';
import { Member } from '../../src/members/member.entity';
import { Album } from '../../src/albums/album.entity';
import { Location } from '../../src/locations/location.entity';
import { Tag } from '../../src/tags/tag.entity';
import { Photo } from '../../src/photos/photo.entity';
import { Comment } from '../../src/comments/comment.entity';
import { AuthModule } from '../../src/auth/auth.module';
import { UsersModule } from '../../src/users/users.module';
import { MembersModule } from '../../src/members/members.module';
import { AlbumsModule } from '../../src/albums/albums.module';
import { LocationsModule } from '../../src/locations/locations.module';
import { TagsModule } from '../../src/tags/tags.module';
import { PhotosModule } from '../../src/photos/photos.module';
import { CommentsModule } from '../../src/comments/comments.module';

export async function createTestApp(): Promise<INestApplication> {
  process.env.JWT_SECRET = 'test-secret';
  process.env.JWT_EXPIRES_IN = '1h';
  process.env.ADMIN_PASSWORD = 'admin123';

  const moduleRef = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({ isGlobal: true, ignoreEnvFile: true }),
      TypeOrmModule.forRoot({
        type: 'better-sqlite3',
        database: ':memory:',
        entities: [User, Member, Album, Location, Tag, Photo, Comment],
        synchronize: true,
        dropSchema: true,
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
  }).compile();

  const app = moduleRef.createNestApplication();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(moduleRef.get(Reflector)));
  await app.init();
  return app;
}
