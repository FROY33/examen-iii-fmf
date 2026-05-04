import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

const ROLE_LEVEL: Record<string, number> = { USER: 1, DEVELOPER: 2, ADMIN: 3 };

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;
    const { user } = context.switchToHttp().getRequest();
    const userLevel = ROLE_LEVEL[user?.role] ?? 0;
    return roles.some(role => userLevel >= (ROLE_LEVEL[role] ?? 0));
  }
}
