import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core'; 

@Component({
  selector: 'app-try',
  templateUrl: './try.component.html',
  styleUrls: ['./try.component.css']
})
export class TryComponent implements OnInit {

  constructor(private router: Router,
  				public zone: NgZone) { }

  ngOnInit(): 
  void {
  	setTimeout(() => {
  		this.zone.run(() => { this.router.navigate(['/home']);});
     
      console.log("hiiiiii");
    },5000);
  
   }



}
