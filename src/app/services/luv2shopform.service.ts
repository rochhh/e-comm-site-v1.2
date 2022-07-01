import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class Luv2shopformService {

  private countriesUrl = 'http://localhost:8081/api/countries'
  private statesUrl  = 'http://localhost:8081/api/states'

  creditCardMonths : number ;
  creditCardYears : number ;

  constructor( private httpclient : HttpClient ) { }

  getCreditCardMonths( startMonth : number ) : Observable<number[]> {
    let data : number[] = [];

    for ( let theMonth = startMonth ; theMonth<=12 ; theMonth++ ){
      data.push(theMonth);
    }
    return of(data);
  }

  getcreditCardYears()  : Observable<number[]> {
    let data : number[] = [];
    const  startYear : number  = new Date().getFullYear()
    const  endYear : number  = startYear + 10;

    for ( let theYear = startYear ; theYear <= endYear ; theYear++ ){
      data.push(theYear);
    }
    return of(data)

  }

  getCountries() : Observable<Country[]>  {
    return this.httpclient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map( response => response._embedded.countries )
    )
  }

  getStates( theCountrycode : string ): Observable<State[]>{

    const searchUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountrycode}`

    return this.httpclient.get<GetResponseStates>(searchUrl).pipe(
      map( response => response._embedded.states )
    )
  }

  

}


interface GetResponseCountries{
  _embedded : {
    countries : Country[]
  }
}

interface GetResponseStates{
  _embedded : {
    states : State[]
  }
}