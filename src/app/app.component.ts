import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadingService } from './loader/loading.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'weather-app';

  loading$!: Observable<boolean>;
  constructor(private router: Router, private loadingService: LoadingService){}

  loader(){
    this.router.navigate(['loader']);
  }
  list(){
    this.router.navigate(['list']);
  }
  
  
  ngOnInit(){
    this.loading$ = this.loadingService.loading$
  }
}
