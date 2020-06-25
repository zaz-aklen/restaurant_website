import { Injectable } from '@angular/core';
import {Leader} from '../shared/Leader';
import {LEADERS} from '../shared/Leaders'
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  getLeader():Promise<Leader[]>{
    return new Promise(resolve =>{setTimeout(()=>resolve(LEADERS),2000)});
  }
  getFeaturedleader():Promise<Leader>{
    return new Promise(resolve =>{setTimeout(()=>resolve(LEADERS.filter((lead) => (lead.featured===true))[0]),2000)});
  }
}
