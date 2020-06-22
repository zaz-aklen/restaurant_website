import {Routes} from '@angular/router';

import { AppComponent } from '../app.component';
import { MenuComponent } from '../menu/menu.component';
import { ContactComponent } from '../contact/contact.component';
import { AboutComponent } from '../about/about.component';
import { HomeComponent } from '../home/home.component';
import { Component } from '@angular/core';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';

export const routes:Routes=[
   { path:'home' ,component: HomeComponent},
   { path:'menu' ,component: MenuComponent},
   { path: 'contactus',     component: ContactComponent },
   { path: 'dishdetails/:id' , component: DishdetailComponent },
   { path: 'about' ,component: AboutComponent},
   {path: '' ,redirectTo:'/home' , pathMatch: 'full' }
];