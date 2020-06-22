import { Injectable } from '@angular/core';
import {DISHES} from '../shared/dishes';
import {Dish} from '../shared/dish';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  getdishes():Dish[]{
    return DISHES;
  }
  getDish(id: String): Dish {
  return DISHES.filter((dish)=>(dish.id===id))[0];
  }
  getFeaturedDish(): Dish {
    return DISHES.filter((dish) => dish.featured)[0];
  }
  constructor() { }
}
