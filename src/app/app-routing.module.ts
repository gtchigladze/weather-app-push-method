import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appendFile } from 'fs';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main'
  },
  {
    path: 'main',
    component: AppComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
