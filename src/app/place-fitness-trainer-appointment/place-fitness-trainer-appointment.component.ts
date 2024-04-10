import { Component, OnInit} from '@angular/core';
import {FormBuilder,FormGroup,Validators } from "@angular/forms";
import {UserService} from '../_services/user.service';


export class Fitness {
  constructor(
    public inr: number,
    public paisa: number,
    public streetaddress: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: number,
    public phonenumber: number,
    public email: string,
    public firstname:string,
    public lastname: string,
    public age:number,
    public trainerpreference: string,
    public physiotherapist: string,
    public packages: string
  ) { 

  }
}

@Component({
  selector: 'app-place-fitness-trainer-appointment',
  templateUrl: './place-fitness-trainer-appointment.component.html'
  
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {

  

  fitnessForm: FormGroup;
  selectedPackage: string;
  weeks: number = 1;
  sessions: number = 1;
  amount : number = 1;
  extra: number = 0;
  therapist: string;

  name: string;
  age: number;
  email: string;
  mob: string;
  add1: string;
  add2: string;
  city: string;
  state: string;
  country: string;
  pin: number;
  pref: string;
  physio: string;
  pack: string;
  successMessageVisible = false;
  errorMessageVisible = false;


  display(){
  console.log(this.city);
  }


  constructor(private userService: UserService) { 

  }



  ngOnInit() {
    
  }
  
  onPhysio(event: any) {
    this.therapist = event.target.value;
    console.log(this.therapist);
    if (this.therapist === 'yes') {
      this.extra = 200;
    } else if (this.therapist === 'no') {
      this.extra = 0;
    }
    this.calculateAmount()
    console.log(this.extra);
} 

  onPackageChange(event: any) {
    this.selectedPackage = event.target.value;
    if (this.selectedPackage === 'fourSess') {
      this.sessions = 4;
    } else if (this.selectedPackage === 'fiveSess') {
      this.sessions = 5;
    }
    this.calculateAmount();
}

calculateAmount() {
  // ... existing calculation logic
  if (this.selectedPackage === 'fourSess') {
    this.amount = 400 * this.sessions * this.weeks + this.extra;
  } else if (this.selectedPackage === 'fiveSess') {
    this.amount = 300 * this.sessions * this.weeks + this.extra;
  }
  else{
    this.amount = 500 + this.extra ;
  }
}


  onSubmit(apptForm) {
    //console.log(apptForm.value);
    let integerPart: number = Math.floor(this.amount);

// Extracting the fractional part
    let fractionalPart: number = this.amount % 1;
    //final_amount = this.amount.toString();
    //console.log(formatNumber(this.amount));
    if (this.pack === 'fourSess'){
      this.pack = '400'
    }
    else if (this.pack === 'fiveSess'){
      this.pack = '300'
    }
    else{
      this.pack = '500'
    }

    const fitnessData = new Fitness(
      integerPart, // Placeholder for INR
      fractionalPart, // Placeholder for Paisa

      this.add1 + ',' + this.add2,
      this.city,
      this.state,
      this.country,
      this.pin,
      +this.mob, // Convert mobile to number
      this.email,
      this.name.split(' ')[0], // Extracting first name from full name
      this.name.split(' ')[1], // Extracting last name from full name
      this.age,
      this.pref,
      this.physio,
      this.pack
    );
    //console.log(fitnessData);
    const jsonData = JSON.stringify(fitnessData);
    console.log(jsonData);
    this.userService.postfitnessdata(fitnessData)
      .subscribe(
        () => {
          console.log('Success');
          this.successMessageVisible = true; // Show success message
          this.errorMessageVisible = false; // Hide error message
        },
        (error) => {
          console.error('Error:', error);
          this.successMessageVisible = false; // Hide success message
          this.errorMessageVisible = true; // Show error message
        }
      );
  }
    
}
