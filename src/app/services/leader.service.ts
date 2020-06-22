import { Injectable } from '@angular/core';
import {Leader} from '../shared/Leader';
import {LEADERS} from '../shared/Leaders'
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  getLeader():Leader[]{
    return LEADERS;
  }
  getFeaturedleader():Leader{
    return LEADERS.filter((lead) => (lead.featured===true))[0];
  }
}
