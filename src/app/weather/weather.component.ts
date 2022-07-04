import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged, fromEvent, map, Observable, Subject, Subscription, switchMap, tap, interval } from 'rxjs';
import { Weather } from '../weather';
import { WeatherService } from '../weather.service';
import { debounce } from "rxjs/operators";
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})


export class WeatherComponent implements OnInit {
  length: any;
  weather: Weather | undefined;
  form!: FormGroup;
  
  // isCityFound: boolean = false;

  isCityFound =  {
    isFound: false,
    errorMessage: ''
  }

 vm$ = this.weatherService.getWeathers();
 

  constructor(private weatherService: WeatherService, private fb: FormBuilder) { }

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
    this.weatherService.getWeather(city).subscribe(weather => { 
      
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
  this.weatherService.getWeathers().subscribe(res => {this.weather = res, console.log(res)})
}

}
