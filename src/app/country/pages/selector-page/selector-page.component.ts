import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interface';
import { Observable, switchMap } from 'rxjs';
// import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: ``
})
export class SelectorPageComponent implements OnInit, OnDestroy{

  constructor(
    private formBuilder: FormBuilder,
    private countriesService: CountriesService
  ){}


  ngOnInit(): void {
    this.onRegionChange();
  }

  ngOnDestroy(): void {
    this.myForm.reset();
  }


  public myForm: FormGroup = this.formBuilder.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required],
  });

  get regions(): Region[]{
    return this.countriesService.regions;
  }

  onRegionChange(): void{
    this.myForm.get('region')!.valueChanges
    .pipe(
      switchMap(region => this.countriesService.getCountriesByRegion(region))
    ).subscribe( (region) => {
        console.log(region);
    });
  }


  onSubmit() {
  throw new Error('Method not implemented.');
  }
}
