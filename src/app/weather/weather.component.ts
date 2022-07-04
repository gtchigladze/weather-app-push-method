import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged, fromEvent, map, Observable, Subject, Subscription, switchMap, tap, interval } from 'rxjs';
import { Weather } from '../weather';
import { WeatherService } from '../weather.service';
import { debounce } from "rxjs/operators";
import {  finalize } from 'rxjs/operators';
import { LoadingService } from '../loader/loading.service';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})


export class WeatherComponent implements OnInit ,OnDestroy {
  length: any;
  weather: Weather | undefined;
  form!: FormGroup;
  subscription!: Subscription
  subscription2!: Subscription 
  // isCityFound: boolean = false;

  isCityFound =  {
    isFound: false,
    errorMessage: ''
  }

 vm$ = this.weatherService.getWeathers();
 

  constructor(private weatherService: WeatherService, private fb: FormBuilder,  private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      val: ["", [Validators.required,  Validators.minLength(3)]
      ]})


  this.form.valueChanges.pipe(debounceTime(500)).subscribe((dataStream: {val: string}) => {
    // console.log(dataStream);
    
    this.search(dataStream.val)
    
  })
    
  }
  
 

  search(city: string){
   if(this.form.valid){
    this.loadingService.start()
   this.subscription =  this.weatherService.getWeather(city).pipe(finalize(()=>this.loadingService.stop())).subscribe(weather => { 
      
   this.weather = weather
   this.isCityFound.isFound = true;
  //  console.log(this.weather)
  //  console.log(weather.weather[0].icon)
    } , (error)=>{
      this.isCityFound.isFound = false;
      this.isCityFound.errorMessage = error
  
      
    }
   
    )}
    }


    // this.isCityFound = true;
    // //  console.log(this.weather)
    // //  console.log(weather.weather[0].icon)
    //   } , (error)=>{
    //     this.isCityFound = false;
    //     console.log(error);
        
    //   }
     
    //   )}

    // 

 
get(){
 this.subscription2 =  this.weatherService.getWeathers().subscribe(res => {this.weather = res, console.log(res)})
}

ngOnDestroy(): void {
this.subscription.unsubscribe()
this.subscription2.unsubscribe()
}

}
