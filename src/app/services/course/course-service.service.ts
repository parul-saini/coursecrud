import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseServiceService {
  apiurl= "http://localhost:5267"
  constructor(private http:HttpClient) { 

  }

  addCourse(course:any){
    return this.http.post<any>(`${this.apiurl}/addCourses`,course);
  }
}
