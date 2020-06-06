import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router, NavigationEnd } from "@angular/router";

import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-loadbooking',
  templateUrl: './loadbooking.component.html',
  styleUrls: ['./loadbooking.component.css']
})
export class LoadbookingComponent implements OnInit, OnDestroy {

  navigationSubscription;
  cities = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor( private dataService: DataService,
               private router: Router,) { 
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  initialiseInvites() {
     this.loadBooking();
   }

  ngOnInit(): void {
  }

  loadBooking() {
    this.dataService.sendGetCityRequest().pipe(takeUntil(this.destroy$)).subscribe((cityData: any[]) => {
      this.cities = cityData;
      console.log(cityData)
    })
  }

  getByCityId(id) {
    if (id == "") {
      console.log("called")
      this.loadBooking();
    }
    else {
      this.dataService.getByCityId(id).subscribe((cityData: any[]) => {
        console.log(Object.keys(cityData).length)
        var stringData = '[' + JSON.stringify(cityData) + ']'
        var parseData = JSON.parse(stringData)
        this.cities = parseData;
      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            //A client-side or network error occurred.
            console.log('An error occurred:', err.error.message);
          } else {
            window.alert("No User Found")
            this.loadBooking();

            //Backend returns unsuccessful response codes such as 404, 500 etc.
            console.log('Backend returned status code: ', err.status);

            console.log('Response body:', err.error);
          }
        }
      )
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  back() {
    window.history.back();
  }

}
