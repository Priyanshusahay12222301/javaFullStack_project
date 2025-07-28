import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-delete',
  standalone: false,
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css',
  providers: [EmployeeService]
})
export class DeleteComponent {
  constructor (private es:EmployeeService){}
  deleteEmp(data:any){
    alert("bye")
    this.es.saveEmp(data.value).subscribe(()=>{alert("Record deleted SucessFully")});
  }

}

  



