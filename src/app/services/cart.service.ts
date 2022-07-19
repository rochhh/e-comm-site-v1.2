import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems : CartItem[] = [];
  totalPrice : Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity : Subject<number> = new BehaviorSubject<number>(0);

  storage : Storage =  sessionStorage;

  constructor() {
    let data = JSON.parse(this.storage.getItem( 'cartItems'));

    if ( data != null ){
      this.cartItems = data
      this.computeCartTotals()
    }

   }

   persistCartItems(){
    this.storage.setItem('cartItems' , JSON.stringify( this.cartItems ) )
   }

  addToCart( theCartItem : CartItem ){
    let alreadyExistsInCart : boolean = false ;
    let existingCartItem : CartItem = undefined;
    
   if ( this.cartItems.length > 0 ){
    for ( let tempCartItem of this.cartItems ){
      if ( tempCartItem.id === theCartItem.id ){
        existingCartItem = tempCartItem
      }
    }
    alreadyExistsInCart = ( existingCartItem != undefined )
   }

   if (alreadyExistsInCart){
    // increment the quantity 
    existingCartItem.quantity++
   }else {
    this.cartItems.push(theCartItem)
   }

   this.computeCartTotals();
    
  }
  computeCartTotals() {

    let totalPriceValue : number = 0;
    let totalQuantityValue : number = 0;

    for (let currentCartItem of this.cartItems ){
      totalPriceValue += currentCartItem.unitPrice * currentCartItem.quantity;
      totalQuantityValue += currentCartItem.quantity
    }

    // publish the values now to the cart component or anyone 

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.persistCartItems()

  }

  decrementQuantity( theCartItem :CartItem ){
    theCartItem.quantity--;

    if ( theCartItem.quantity === 0 ){
      this.remove(theCartItem)
    }
    else {
      this.computeCartTotals()
    }
  }
  
  remove( theCartItem : CartItem ){
    const itemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.id == theCartItem.id )

    if ( itemIndex > -1 ){
      this.cartItems.splice( itemIndex ,1 )
    }
    this.computeCartTotals();
  }
  

}
