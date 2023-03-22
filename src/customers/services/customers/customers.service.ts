import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { Customer } from 'src/customers/types/customer';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    {
      id: 1,
      email: 'long@gmail.com',
      name: 'Long',
    },
    {
      id: 2,
      email: 'long2@gmail.com',
      name: 'Long2',
    },
    {
      id: 3,
      email: 'long3@gmail.com',
      name: 'Long3',
    },
  ];
  findCustomerById(id: number) {
    return this.customers.find((user) => user.id === id);
  }
  createCustomer(customerDto: CreateCustomerDto) {
    this.customers.push(customerDto);
  }
  getCustomers() {
    return this.customers;
  }
}
