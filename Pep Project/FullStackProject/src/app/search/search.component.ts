import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  providers:[EmployeeService]
})
export class SearchComponent {
  id: string = '';
  constructor( private es:EmployeeService) {}
  emp:any;
  getEmp(eid:any){
    this.es.getEmp(eid.value.id).subscribe((res:any)=>{this.emp=res});

  }

}
