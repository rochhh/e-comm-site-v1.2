import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MetaGuard } from './guards/meta.guard';

const routes: Routes = [
  { path: '' , component : HomeComponent , loadChildren : () => import('./components/home/home.module').then( m => m.HomeModule ) , canActivate : [MetaGuard]   },
  { path: 'login' , component : RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
