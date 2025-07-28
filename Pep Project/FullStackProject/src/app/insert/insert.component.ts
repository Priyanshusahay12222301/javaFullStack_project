import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-insert',
  standalone: false,
  templateUrl: './insert.component.html',
  styleUrl: './insert.component.css'
})
export class InsertComponent {
  constructor (private es:EmployeeService){}
  insertDetails(data:any){
    alert("bye")
    this.es.saveEmp(data.value).subscribe(()=>{alert("Record inserted SucessFully")});
  }

}
