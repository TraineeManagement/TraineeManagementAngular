import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseRepository } from 'src/app/model/Repository/course.repository';
import { Branch } from 'src/app/model/branch';
import { Course } from 'src/app/model/course';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css']
})
export class ViewCourseComponent implements OnInit {
  public course:Course=new Course()
  public branch:Branch=new Branch()
  constructor(private courseRepository:CourseRepository,private router:Router) { }
ngOnInit() {
  }
  saveCourse()
  {

    location.reload()
    return this.courseRepository.saveCourse();
  }
  getCourses()
  {
return this.courseRepository.getCourses();

  }
goBack() {
  this.router.navigate(['/batchhome/course']);
}


}
