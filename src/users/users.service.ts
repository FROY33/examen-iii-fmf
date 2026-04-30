import { Injectable, NotFoundException, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User, Role } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    private configService: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    const exists = await this.usersRepo.findOne({ where: { username: 'admin' } });
    if (!exists) {
      const password = await bcrypt.hash(
        this.configService.get<string>('ADMIN_PASSWORD', 'admin123'),
        10,
      );
      await this.usersRepo.save(
        this.usersRepo.create({ nombre: 'Admin', username: 'admin', password, role: Role.ADMIN }),
      );
    }
  }

  async create(dto: CreateUserDto): Promise<User> {
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.usersRepo.create({ ...dto, password: hashed, role: dto.role ?? Role.USER });
    return this.usersRepo.save(user);
  }

  async findAll(currentUser: { id: number; role: Role }): Promise<User[]> {
    if (currentUser.role === Role.USER) {
      return this.usersRepo.find({ where: { id: currentUser.id } });
    }
    return this.usersRepo.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (dto.password) dto.password = await bcrypt.hash(dto.password, 10);
    Object.assign(user, dto);
    return this.usersRepo.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepo.remove(user);
  }

  async assignRole(id: number, role: Role): Promise<User> {
    const user = await this.findOne(id);
    user.role = role;
    return this.usersRepo.save(user);
  }
}
