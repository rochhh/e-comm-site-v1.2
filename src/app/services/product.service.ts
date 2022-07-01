import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})  
export class ProductService {


  private baseUrl = 'http://localhost:8081/api/products';

  private categoryUrl = 'http://localhost:8081/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProduct(theProductId: number): Observable<Product> {

    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  getProductListPaginate(thePage: number, 
                         thePageSize: number, 
                         theCategoryId: number): Observable<GetResponseProducts> {

    // need to build URL based on category id, page and size 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                    + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }


  getProductList(theCategoryId: number): Observable<Product[]> {

    // need to build URL based on category id 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  searchProducts(theKeyword: string): Observable<Product[]> {

    // need to build URL based on the keyword 
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(thePage: number, 
                        thePageSize: number, 
                        theKeyword: string): Observable<GetResponseProducts> {

    // need to build URL based on keyword, page and size 
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                    + `&page=${thePage}&size=${thePageSize}`;
    
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }



  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(response => response._embedded.products));
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}


//   private baseUrl = 'http://localhost:8081/api/products';
//   private categoryUrl = 'http://localhost:8081/api/product-category';

//   constructor( private httpClient : HttpClient ) { }

//   getProductList( theCategoryId : any ) : Observable<Product[]> {

//     const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`

//     return this.getProducts(searchUrl)
//   }


//   getProductListPaginate(  thePage : number , thePageSize : number  ,theCategoryId : number ) : Observable<GetResponseProducts> {

//     const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
//                     + `&page=${thePage}&size=${thePageSize} `  // &page=${thePage}&size=${thePageSize}
    
//     return this.httpClient.get<GetResponseProducts>(searchUrl);
//   }

//   searchProductsPaginate(  thePage : number , thePageSize : number  ,theKeyword : string ) : Observable<GetResponseProducts> {

//     const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
    
//     return this.httpClient.get<GetResponseProducts>(searchUrl);
//   }


//   // getProductListPaginate( theCategoryId : any ) : Observable<Product[]> {

//   //   const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`  do without id 

//   //   return this.getProducts(searchUrl)
//   // }


//   getProductCategories() : Observable<ProductCategory[]> {
    
//     return this.httpClient.get<GetResponseCategory>(this.categoryUrl).pipe(
//       map( response => response._embedded.productCategory  )
//     )
//   }

//   searchProducts( theKeyword : any) : Observable<Product[]> {

//     const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`

//     return this.getProducts(searchUrl)

//   }

//   getProduct( theProductId : number ):Observable<Product>{
//     const productUrl = `${this.baseUrl}/${theProductId}`;
//     return this.httpClient.get<Product>(productUrl);
//   }


//   private getProducts(searchUrl: string): Observable<Product[]> {
//     return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
//       map(response => response._embedded.products)
//     );
//   }
// }

// interface GetResponseProducts{
//   _embedded: {
//     products : Product[]
//   },
//   "page" : {
//     "size":number,
//     "totalElements": number,
//     "totalPages":number,
//     "number" : number 
//   }
// }

// interface GetResponseCategory{
//   _embedded: {
//     productCategory : ProductCategory[]
//   }
