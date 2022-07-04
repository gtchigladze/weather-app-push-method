import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, debounceTime, Observable, pipe, Subject, throwError } from 'rxjs';
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


  constructor(private http: HttpClient,) { }
  getWeather(city: string): Observable<Weather>{
    const options = new HttpParams()
    .set('units', 'metric')
    .set('q', city)
    .set('appId', environment.apiKey);

    return this.http.get<Weather>(environment.apiUrl + 'weather', {params: options})
  }

  search(city: string){
    this.getWeather(city).subscribe(res => { this.subject.next(res) })
    }

    getWeathers(): Observable<any>{
    return this.subject.asObservable()
    }
  

    // private handleError(error: HttpErrorResponse) {
    //   var message = ''
    //   if (error.status === 0) {
    //     // A client-side or network error occurred. Handle it accordingly.
    //     console.error('An error occurred:', error.error);
    //   } else {
    //     // The backend returned an unsuccessful response code.
    //     // The response body may contain clues as to what went wrong.
    //     console.error(
    //       `Backend returned code ${error.status}, body was: `, error.error.message);
    //       message = error.error.message
    //   }
    //   // Return an observable with a user-facing error message.
    //   return throwError(() => new Error(message));
    // }

    


}
