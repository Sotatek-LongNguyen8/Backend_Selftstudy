import { ExecutionContext } from '@nestjs/common';
import { ContextCreator } from '@nestjs/core/helpers/context-creator';
import { AuthGuard } from '@nestjs/passport';

export class localAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result;
  }
}
