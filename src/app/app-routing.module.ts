import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';


const routes: Routes = [
  { path: 'checkout' , component : CheckoutComponent },
  { path: 'cart-details' , component : CartDetailsComponent },
  { path: 'products/:id' , component : ProductDetailsComponent },
  { path: 'search/:keyword' , component : ProductListComponent },
  { path: 'category/:id' , component : ProductListComponent  },
  { path: 'category' , component : ProductListComponent  },
  { path: 'products' , component : ProductListComponent },
  // { path : 'login' , component : LoginSignupComponent },
  // { path : 'signup' , component : SignupComponent },
  { path: '' , redirectTo: '/products' , pathMatch:'full'  },
  { path: '**' , component: PagenotfoundComponent  },
// DashboardComponent , canActivate : [AuthGuard]
];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
