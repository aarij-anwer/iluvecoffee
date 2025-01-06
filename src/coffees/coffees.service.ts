import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['medium', 'vanilla'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const returnVal = this.coffees.find((item) => item.id === +id);
    if (!returnVal) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return returnVal;
  }

  create(createCoffeeDto: any) {
    const newCoffee = { id: this.coffees.length + 1, ...createCoffeeDto };
    this.coffees.push(newCoffee);
    return newCoffee;
  }

  update(id: string, updateCoffeeDto: any) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      this.coffees = this.coffees.map((item) =>
        item.id === +id ? { ...item, ...updateCoffeeDto } : item,
      );
      return this.coffees[+id - 1];
    }

    throw new NotFoundException(`Coffee #${id} not found`);
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeeIndex >= 0) {
      return this.coffees.splice(coffeeIndex, 1);
    }

    throw new NotFoundException(`Coffee #${id} not found`);
  }
}
