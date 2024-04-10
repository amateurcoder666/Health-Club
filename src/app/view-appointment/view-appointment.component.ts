import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';


@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html'
})
export class ViewAppointmentComponent implements OnInit {

  
  constructor(private appointment: UserService ) { }
  appointmentData ={};
  length = 0;


  ngOnInit() {
    this.getfitness();
  }

  getfitness() {
    this.appointment.getfitnessdata().subscribe((allData) =>{
     this.appointmentData = allData;
     this.length = Object(this.appointmentData).length; 
    });
  }
}
