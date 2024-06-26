import { Injectable } from '@angular/core';
import { Region, SmallCountry } from '../interfaces/country.interface';
import { Observable, of, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private baseUrl = 'https://restcountries.com/v3.1';

  private _regions: Region[] = [Region.Africa, Region.America, Region.Asia, Region.Europe, Region.Oceania];

  constructor(private http: HttpClient) { }


  get regions(): Region[]{
    return [...this._regions];
  }



  getCountriesByRegion(region: Region): Observable<SmallCountry[]>{
    if(!region) return of([]);

    const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;

    return this.http.get<SmallCountry[]>(url)
    .pipe(
      tap( resp => console.log(resp)),
    );
  }

}
