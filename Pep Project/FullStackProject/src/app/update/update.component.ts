import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-update',
  standalone: false,
  templateUrl: './update.component.html',
  styleUrl: './update.component.css',
  providers:[EmployeeService]
})
export class UpdateComponent {
  constructor (private es:EmployeeService){}
    insertDetails(data:any){
      alert("bye")
      this.es.saveEmp(data.value).subscribe(()=>{alert("Record inserted SucessFully")});
    }
  
  }