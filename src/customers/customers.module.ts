import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CustomersController } from './controllers/customers/customers.controller';
import { ValidateCustomerAccountMiddleware } from './middlewares/validate-customer-account.middleware';
import { ValidateCustomerMiddleware } from './middlewares/validate-customer.middleware';
import { CustomersService } from './services/customers/customers.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        ValidateCustomerMiddleware,
        ValidateCustomerAccountMiddleware,
        (req: Request, res: Response, next: NextFunction) => {
          console.log('Last middleware');
          next();
        },
      )
      .exclude(
        {
          path: 'customers/create',
          method: RequestMethod.POST,
        },
        {
          path: 'customers',
          method: RequestMethod.GET,
        },
      )
      .forRoutes(CustomersController);
  }
}
