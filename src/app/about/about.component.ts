import { Component, OnInit,Inject } from '@angular/core';
import {LeaderService} from '../services/leader.service';
import {Dish} from '../shared/dish'
import {Leader} from '../shared/Leader';
import { baseURL } from '../shared/baseurl';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  leader:Leader[];
  public BaseURL;
  errMess:string;
  constructor(private leaderservice:LeaderService, @Inject('BaseURL') BaseURL) { 
    this.BaseURL=BaseURL;
  }

  ngOnInit(){
    this.leaderservice.getLeader().subscribe(leader => this.leader=leader,
      errmess=>this.errMess=<any>errmess);
  }

}
