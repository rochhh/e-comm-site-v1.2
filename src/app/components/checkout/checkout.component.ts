import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { Orderitem } from 'src/app/common/orderitem';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Luv2shopformService } from 'src/app/services/luv2shopform.service';
import { Luv2ShopValidators } from 'src/app/validators/luv2-shop-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  creditCardMonths : number[] = [];
  creditCardYears : number[] = [];

  checkoutFormGroup : FormGroup ;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  countries : Country[] = [];
  states : State[] = [];

  shippingAddressStates : State[] = [];
  billingAddressStates : State[] = [];

  constructor( private formBuilder : FormBuilder ,
               private luv2ShopFormService : Luv2shopformService ,
               private cartService : CartService ,
               private checkoutService : CheckoutService ,
               private router : Router ) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer : this.formBuilder.group({
        firstName : new FormControl('' , [Validators.required , Validators.minLength(6) , Luv2ShopValidators.notOnlyWhiteSpace ]),
        lastName : new FormControl('' , [Validators.required , Validators.minLength(6) , Luv2ShopValidators.notOnlyWhiteSpace ]),
        email : new FormControl( '', [Validators.required , Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$') ])
      }),
      shippingAddress : this.formBuilder.group({
        street : new FormControl('' , [Validators.required , Validators.minLength(6) , Luv2ShopValidators.notOnlyWhiteSpace ]),
        city : new FormControl('' , [Validators.required , Validators.minLength(6) , Luv2ShopValidators.notOnlyWhiteSpace ]),
        country : new FormControl( '' , [Validators.required]  ),
        state : new FormControl( '' , [Validators.required]  ),
        zipCode : new FormControl('' , [Validators.required , Validators.minLength(6) , Luv2ShopValidators.notOnlyWhiteSpace ]),
      }),
      billingAddress : this.formBuilder.group({
        street : new FormControl('' , [Validators.required , Validators.minLength(6) , Luv2ShopValidators.notOnlyWhiteSpace ]),
        city : new FormControl('' , [Validators.required , Validators.minLength(6) , Luv2ShopValidators.notOnlyWhiteSpace ]),
        country : new FormControl( '' , [Validators.required]  ),
        state : new FormControl( '' , [ Validators.required ] ),
        zipCode : new FormControl('' , [Validators.required , Validators.minLength(6) , Luv2ShopValidators.notOnlyWhiteSpace ]),
      }),
      creditCard : this.formBuilder.group({
        cardType : new FormControl( '' , [Validators.required] ),
        nameOnCard : new FormControl('' , [Validators.required , Validators.minLength(4) , Luv2ShopValidators.notOnlyWhiteSpace ]),
        cardNumber : new FormControl( '' , [Validators.pattern( '[0-9]{16}' )]),
        securityCode : new FormControl( '' , [ Validators.pattern( '[0-9]{3}' ) ]  ) ,
        expirationMonth : new FormControl( '' , [Validators.required] ),
        expirationYear : new FormControl( '' , [Validators.required] )
      })
    })


    // populate credit card months and years 

    const startmonth = new Date().getMonth() + 1;
    

    this.luv2ShopFormService.getCreditCardMonths(startmonth).subscribe( data =>  this.creditCardMonths=data )
    this.luv2ShopFormService.getcreditCardYears().subscribe( data => this.creditCardYears = data )

    this.luv2ShopFormService.getCountries().subscribe( data => this.countries=data )
    
    this.reviewCartDetails();

  }
  reviewCartDetails() {

    this.cartService.totalPrice.subscribe( data => this.totalPrice = data )
    this.cartService.totalQuantity.subscribe( data => this.totalQuantity = data )

  }

  get firstName(){ return this.checkoutFormGroup.get('customer.firstName') }
  get lastName(){ return this.checkoutFormGroup.get('customer.lastName') } 
  get email(){ return this.checkoutFormGroup.get('customer.email') } 

  get shippingAddressState(){ return this.checkoutFormGroup.get('shippingAddress.state') }
  get shippingAddressStreet(){ return this.checkoutFormGroup.get('shippingAddress.street') }
  get shippingAddressCountry(){ return this.checkoutFormGroup.get('shippingAddress.country') }
  get shippingAddressZipCode(){ return this.checkoutFormGroup.get('shippingAddress.zipCode') }
  get shippingAddressCity(){ return this.checkoutFormGroup.get('shippingAddress.city') }


  get billingAddressState(){ return this.checkoutFormGroup.get('billingAddress.state') }
  get billingAddressStreet(){ return this.checkoutFormGroup.get('billingAddress.street') }
  get billingAddressCountry(){ return this.checkoutFormGroup.get('billingAddress.country') }
  get billingAddressZipCode(){ return this.checkoutFormGroup.get('billingAddress.zipCode') }
  get billingAddressCity(){ return this.checkoutFormGroup.get('billingAddress.city') }

  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }

  
  onSubmit(){
    console.log(this.checkoutFormGroup.value)

    if (this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
      return ; // dont submit basically 
    }
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    const cartItems = this.cartService.cartItems

    let orderItems : Orderitem[] = [];

    for (let i =0 ; i<cartItems.length ; i++ ){
      orderItems[i] = new Orderitem(cartItems[i])
    }

    let purchase = new Purchase();

    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState : State = JSON.parse(JSON.stringify(purchase.shippingAddress.state))
    const shippingCountry : Country = JSON.parse(JSON.stringify( purchase.shippingAddress.country))

    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;


    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState : State = JSON.parse(JSON.stringify(purchase.billingAddress.state))
    const billingCountry : Country = JSON.parse(JSON.stringify( purchase.billingAddress.country))

    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country = billingCountry.name;

    purchase.order=order;
    purchase.orderItems=orderItems;

    this.checkoutService.placeOrder(purchase).subscribe({
      next : response => { alert(`Your order has been placed \n Your OrderId: ${response.orderTrackingNumber} `)
    
      this.resetCart();
    } , 
      error : err => { alert(` There was an Error: ${err.message} `)   }
    })

  }
  resetCart() {
    this.cartService.cartItems= [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.checkoutFormGroup.reset();
    this.router.navigateByUrl('/products');
  }


  copyShippingAddressToBillingAddress(event){
    if ( event.target.checked ){
      this.checkoutFormGroup.controls['billingAddress']
                              .setValue( this.checkoutFormGroup.controls['shippingAddress'].value )

                              this.billingAddressStates = this.shippingAddressStates       // *****                         
    }
    else {
      this.checkoutFormGroup.controls['billingAddress'].reset()
      this.billingAddressStates = [];
    }
  }


  handleMonthsAndYears(){

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear = new Date().getFullYear();
    const selectedYear = Number(creditCardFormGroup.value.expirationYear);

    let startmonth : number ;

    if ( currentYear === selectedYear ){
      startmonth = new Date().getMonth() + 1;
    }else{
      startmonth =1;
    }

    this.luv2ShopFormService.getCreditCardMonths(startmonth).subscribe( data => this.creditCardMonths = data )

  }

  getStates( formGroupName : string ){
    const formGroup= this.checkoutFormGroup.get(formGroupName)
    const countryCode = formGroup.value.country.code;

    this.luv2ShopFormService.getStates(countryCode).subscribe( 
      data => {
        if ( formGroupName === 'shippingAddress' ){
          this.shippingAddressStates = data
        }else [
          this.billingAddressStates = data
        ]

        formGroup.get('state').setValue(data[0])

      }
    )

  }

}



