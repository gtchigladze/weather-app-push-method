import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Weather } from './weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  weather: Weather | undefined;
  citySubject = new Subject<any>()

  private subject = new BehaviorSubject<any>([]);
  // weather$: Observable<any> = this.subject.asObservable();


  constructor(private http: HttpClient) { }
  getWeather(city: string): Observable<Weather>{
    const options = new HttpParams()
    .set('units', 'metric')
    .set('q', city)
    .set('appId', environment.apiKey);

    return this.http.get<Weather>(environment.apiUrl + 'weather', {params: options})
  }

  // changeCity(city: string) {
  //   this.subject.next(city)
  // }

  search(city: string){
    this.getWeather(city).subscribe((res:any) => {this.subject.next(res)})
    }

    getWeathers(): Observable<any>{
    return this.subject.asObservable()
    }
  


  
  





}
