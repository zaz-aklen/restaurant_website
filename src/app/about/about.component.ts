import { Component, OnInit } from '@angular/core';
import {LeaderService} from '../services/leader.service';
import {Dish} from '../shared/dish'
import {Leader} from '../shared/Leader';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  leader:Leader[];
  constructor(private leaderservice:LeaderService) { }

  ngOnInit(){
    this.leaderservice.getLeader().then(leader => this.leader=leader);
  }

}
