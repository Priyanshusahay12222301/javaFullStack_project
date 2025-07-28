import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  getEmp(eid:any){
    return this.http.get(this.url3+"/"+eid);
  }

  constructor(private http:HttpClient) {}
  url1="http://localhost:9090/api/employees"
  url2="http://localhost:9090/api/delete"
  url3="http://localhost:9090/api/emp"
  url4="http://localhost:9090/api/save"

  saveEmp(data:any){
    alert("Save Successfully")
      return this.http.post(this.url4,data);
    
  }

  getEmployees(){
    return this.http.get(this.url1);
  }
  deleteEmp(id:any){
    alert(id+"employee has been deleted from system")
    return this.http.delete(this.url2+"/"+id);
  }

   
}
