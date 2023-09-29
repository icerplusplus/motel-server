import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators';
import { Roles } from '../utils/variables';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // TODO: ignore roles middleware if route not use @RoleGuard() decorator
    if (!requiredRoles) {
      return true;
    }
    console.log('context: ', context.switchToHttp().getRequest());

    // TODO: get user data from request
    const { user } = context.switchToHttp().getRequest();
    console.log('user: ', user);

    // TODO: next if user role value is valid
    return requiredRoles.some((role) => user?.role?.includes(role));
  }
}
