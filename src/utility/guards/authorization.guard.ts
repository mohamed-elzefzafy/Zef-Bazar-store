// import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';

// @Injectable()
// export class AuthorizeGuard implements CanActivate {
//   constructor(private readonly reflector: Reflector) {}
//   canActivate(context: ExecutionContext): boolean {
//     const allowedRolles = this.reflector.get<string[]>(
//       'allowedRoles',
//       context.getHandler(),
//     );
//     console.log(allowedRolles);
    
//     const request = context.switchToHttp().getRequest();
//     const result = request?.currentUser?.roles?.map((role: string) =>
//       allowedRolles.includes(role)).find((val: boolean) => val === true);
//     if (result) return true;
//     throw new UnauthorizedException("sorry you are not authorized");
//   }
// }


import { CanActivate, ExecutionContext, mixin, UnauthorizedException } from '@nestjs/common';


export const AuthorizedGuard = (allowedRolles : string[]) => {
class roledGuardMixixn implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const result = request?.currentUser?.roles?.map((role: string) =>
      allowedRolles.includes(role)).find((val: boolean) => val === true);
    if (result) return true;
    throw new UnauthorizedException("sorry you are not authorized");
  }
}
const guard = mixin(roledGuardMixixn);
return guard;
}