import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseServiceService } from '../services/course/course-service.service';
import { ToastrService } from 'ngx-toastr';
import { getLocaleEraNames } from '@angular/common';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {
  courseForm: FormGroup;
  levels = ['Easy', 'Medium', 'Difficult'];
  categories = ['Frontend', 'Backend', 'Fullstack', 'DevOps','Database'];
  
  constructor(
    private fb: FormBuilder,
    private courseService: CourseServiceService,
    private toastr: ToastrService
  ) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['',  [Validators.required, Validators.maxLength(500)]],
      price: [0, Validators.required],
      instructor: ['', Validators.required],
      level: ['', Validators.required],
      category: ['', Validators.required],
      createdAt: [new Date(), Validators.required],
      updatedAt: [new Date(), Validators.required]
    });
  }

  onSubmit(){
      if(this.courseForm.valid){
       // console.log(this.courseForm.value);
        const course= this.courseForm.value;
          // Call the service to add the course
        this.courseService.addCourse(course).subscribe(
          response => {
            console.log('Course added successfully', response);
            this.toastr.success(' ', 'Course added successfully', {
              timeOut: 3000,
            });
            this.courseForm.reset();
          },
          error => {
            console.error('Error adding course', error);
            // Handle error (show message, log, etc.)
            this.toastr.error('everything is broken', 'Error adding course', {
              timeOut: 3000,
            });
          }
      );
      }else{
        console.error('Invalid from');
      }
  }


}

