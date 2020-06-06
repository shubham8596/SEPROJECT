import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ridebooking',
  templateUrl: './ridebooking.component.html',
  styleUrls: ['./ridebooking.component.css']
})
export class RidebookingComponent implements OnInit {

 // public cityarray:["swargate","katraj","aundh","FC Road","JM Road","magarpatta city","wakad","bavdhan","hinjewadi","camp","Fashion street","baner","university","pashan","shivajinagar","hadapsar"]
 cities = [];
 destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private dataService: DataService,
  ) { }
  registerForm: FormGroup;
  uid = new FormControl('', [Validators.required]);
  source = new FormControl('', [Validators.required]);
  destination = new FormControl('', [Validators.required]);
  amount = new FormControl('');
  ngOnInit() {
    this.createFormValidations();
  }
  
  
  openSnackBar(message,action) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  createFormValidations() {
    this.registerForm = this.formBuilder.group({
      uid: this.uid,
      source: this.source,
      destination: this.destination,
      amount:this.amount
    },
    );
  }

  

  onSubmit() {
    let cityData = {
      "uid": this.registerForm.value.uid,
      "source": this.registerForm.value.source,
      "destination": this.registerForm.value.destination,
      "amount":Math.floor((Math.random()*(100 - 40))+40)
    };
    if (this.registerForm.invalid) {

      return;
    }
    console.log(cityData)
   // console.log(cityarray[2])
    if(cityData.source==cityData.destination)
    {
        window.alert("Please enter different source and destination")
    }
    else if((cityData.source=="swargate" || cityData.source=="katraj" || cityData.source=="aundh" || cityData.source=="FC Road" || cityData.source=="JM Road" || cityData.source=="magarpatta city" || cityData.source=="wakad" || cityData.source=="bavdhan" || cityData.source=="hinjewadi" || cityData.source=="camp" || cityData.source=="Fashion street" || cityData.source=="baner" || cityData.source=="university" || cityData.source=="pashan" || cityData.source=="shivajinagar" || cityData.source=="hadapsar" ) && (cityData.destination=="swargate" || cityData.destination=="katraj" || cityData.destination=="aundh" || cityData.destination=="wakad" || cityData.destination=="bavdhan" || cityData.destination=="FC Road" || cityData.destination=="JM Road" || cityData.destination=="hinjewadi" || cityData.destination=="camp" || cityData.destination=="Fashion street" || cityData.destination=="magarpatta city" || cityData.destination=="baner" || cityData.destination=="university" || cityData.destination=="pashan" || cityData.destination=="shivajinagar" || cityData.destination=="hadapsar" ))
    {
       window.alert("Ride Booked from '"+cityData.source+"' to '"+cityData.destination+"' Successfully \n Amount is : "+cityData.amount+" ₹")
       this.dataService.insertBooking(cityData).subscribe(cityData => {
     
      })
    }
    else
    {
      window.alert("Ride is not available from '"+cityData.source+"' to '"+cityData.destination+"'")
    }
   
    

  }

  loadBooking() {
    this.dataService.sendGetCityRequest().pipe(takeUntil(this.destroy$)).subscribe((cityData: any[]) => {
      this.cities = cityData;
      console.log(cityData)
    })
  }
  
  getByCityId(id) {
    if (id.trim() == "") {
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

}
