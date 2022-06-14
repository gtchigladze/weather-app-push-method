import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, debounceTime, Subject, switchMap, tap } from 'rxjs';
import { Weather } from '../weather';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  weather: Weather | undefined ;

  searchInput = new FormControl();

 

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {

  }

  
  search(city: string){
    this.weatherService.getWeather(city).subscribe(weather => { 
   this.weather = weather
   console.log(this.weather)
   console.log(weather.weather[0].icon)
    })
    }

 
get(){
  this.weatherService.getWeathers().subscribe(res=> {this.weather = res, console.log(res)})
}

}
