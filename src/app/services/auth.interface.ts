import { User } from '../models';
import { Tenant } from '../models/tenant.model';

export interface IAuth {
  currentUser(): User;
  currentTenant(): Tenant;
  hasPermission(permissions: string | string[]): boolean;
}
