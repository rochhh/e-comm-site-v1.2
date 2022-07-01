import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatCardModule} from '@angular/material/card';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import {MatInputModule} from '@angular/material/input';
// import {MatIconModule} from '@angular/material/icon';
// import {MatButtonModule} from '@angular/material/button';
// import {DragDropModule} from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {MatSnackBarModule} from '@angular/material/snack-bar';
// import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// import {MatDialogModule} from '@angular/material/dialog';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';



@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    PagenotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    // MatToolbarModule,
    // MatCardModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatIconModule,
    // MatButtonModule,
    ReactiveFormsModule,
    // DragDropModule,
    HttpClientModule,
    // MatSnackBarModule,
    // MatProgressSpinnerModule,
    // MatDialogModule,
    NgbModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
