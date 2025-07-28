import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-viewall',
  standalone: false,
  templateUrl: './viewall.component.html',
  styleUrl: './viewall.component.css',
  providers:[EmployeeService]
})
export class ViewallComponent {
  constructor (private es:EmployeeService) { this.getAll()}
    emp:any;
    getAll(){
      this.es.getEmployees().subscribe((res:any)=>{this.emp=res})
    }
    delete(e:any){
      this.es.deleteEmp(e).subscribe(()=>{this.getAll})
    }
    deleteEmp(data:any){
      this.es.saveEmp(data.value).subscribe(()=>{alert("Record deleted SucessFully")});
    }
  

    
  }


