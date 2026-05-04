import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, Role } from '../users/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<User> {
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.usersRepo.create({
      nombre: dto.nombre,
      username: dto.username,
      password: hashed,
      role: Role.USER,
    });
    try {
      return await this.usersRepo.save(user);
    } catch (e) {
      if (e instanceof QueryFailedError && (e as any).errno === 1062) {
        throw new ConflictException(`Username '${dto.username}' is already taken`);
      }
      throw e;
    }
  }

  async login(dto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.usersRepo.findOne({ where: { username: dto.username } });
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { id: user.id, username: user.username, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }
}
