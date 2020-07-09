import { Component, OnInit ,Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import {Leader} from '../shared/Leader';
import {LeaderService} from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader:Leader;
  public BaseURL;
  dishErrMsg :string;
  proErrMsg :string;
  leadErrMsg :string;
  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice: LeaderService,
    @Inject('BaseURL') BaseURL) { 
      this.BaseURL=BaseURL;
    }

  ngOnInit() {
     this.dishservice.getFeaturedDish().subscribe(dishservice => this.dish = dishservice,
      errmess=>this.dishErrMsg=<any>errmess);
     this.promotionservice.getFeaturedPromotion().subscribe(promotion =>this.promotion = promotion,
      errmess=>this.proErrMsg=<any>errmess);
     this.leaderservice.getFeaturedleader().subscribe(leader =>this.leader = leader,
      errmess=>this.leadErrMsg=<any>errmess);
  }

}
