import { Injectable } from '@angular/core';
import {Leader} from '../shared/Leader';
import {LEADERS} from '../shared/Leaders';
import {Observable,of} from 'rxjs';
import {delay} from 'rxjs/Operators';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  getLeader():Observable<Leader[]>{
    return of(LEADERS).pipe(delay(2000));
  }
  getFeaturedleader():Observable<Leader>{
    return of(LEADERS.filter((lead) => (lead.featured===true))[0]).pipe(delay(2000));
  }
}
