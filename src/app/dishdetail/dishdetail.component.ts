import { Component, OnInit,ViewChild ,Inject} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {cfeedback} from '../shared/cform';
import {FormBuilder ,FormGroup, Validators} from '@angular/forms';
import { Comments } from '../shared/comment';
import { trigger, state, style, animate, transition, animation } from '@angular/animations';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [trigger('visibility',[
    state('shown',style({
      transform: 'scale(1.0)',
      opacity: 1
  })),
    state('hidden',style({
      transform: 'scale(0.1)',
      opacity: 0
  })),
  transition('* => *', animate('0.4s ease-in-out'))
  ])]
  
})
export class DishdetailComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective;
  dishIds: string[];
  prev: string;
  next: string;
  dish:Dish;
  dishcopy:Dish;
  errMess:string;
  Cfeedback: cfeedback;
  feedbackForm: FormGroup;
  visibility='shown';
  temp:Comments={
    rating: 0,
    comment:'',
    author:'',
    date:''
  };
  
  formErrors={
    'author':'',
    'comment':''
  };
  validationmessages={
    'author':{
      'required':'this field is required',
       'minlength':'minimum length must be 2 characters'
    },
    'comment':{
      'required':'this field is required'
    },
  };
  public BaseURL;
  constructor(private dishservice: DishService,private route:ActivatedRoute
    ,private location:Location,private fb:FormBuilder,
    @Inject('BaseURL') BaseURL) { 
      this.createForm();
      this.BaseURL=BaseURL;
    }

  ngOnInit(): void {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => {this.visibility='hidden';
      return this.dishservice.getDish(params['id']);}))
    .subscribe(dish => { this.dish = dish;this.dishcopy=dish; this.setPrevNext(dish.id);
      this.visibility = 'shown'; },
    errmess=>this.errMess=<any>errmess
    );
  }
  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  goBack(): void {
    this.location.back();
  }
  createForm(){
    this.feedbackForm=this.fb.group({
      author:['',[Validators.required,Validators.minLength(2)]],
      rating:'5',
      comment:['',Validators.required]
    });
    this.feedbackForm.valueChanges.subscribe(data=>this.onvaluechange(data));
    this.onvaluechange();
  }
  
  
  onvaluechange(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationmessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  onsubmit(){
  
    this.Cfeedback=this.feedbackForm.value;
  this.temp['rating']=this.Cfeedback['rating'];
  this.temp['comment']=this.Cfeedback['comment'];
  this.temp['author']=this.Cfeedback['author'];
  this.temp['date']=Date();
  //console.log(this.temp)
  //this.dish['comments'].push(this.temp);
  this.dishcopy.comments.push(this.temp);
    this.dishservice.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
      errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });
  this.feedbackForm.reset();
  this.feedbackFormDirective.resetForm({
    author: '',
    rating:'5',
    message: ''
  });
  }
}
