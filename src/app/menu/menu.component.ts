import { Component, OnInit , Inject} from '@angular/core';
import {Dish} from '../shared/dish'
import { DishService } from '../services/dish.service';
import { baseURL } from '../shared/baseurl';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  dishes:Dish[];
  errMess:string;
  public BaseURL;
  constructor(private dishservice:DishService,
    @Inject('BaseURL') BaseURL) {
      this.BaseURL=BaseURL;
     }

  ngOnInit(): void {
    this.dishservice.getdishes().subscribe(dishes => this.dishes=dishes,
      errmess=>this.errMess=<any>errmess);
  }
}