import { SetMetadata } from '@nestjs/common';
import { Roles as RoleApp } from '../utils/variables';

// Public decorator, don't need to authorize
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

// Roles decorator
export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleApp[]) => SetMetadata(ROLES_KEY, roles);
