import { RestDataSource } from './../restdatasource';
import { EventEmitter, Injectable } from '@angular/core';
import { Course } from '../course';
import { Subjects } from '../subject';
import { Trainer } from '../trainer';
import { Trainee } from '../trainee';
import { Batch } from '../batch';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class CourseRepository {
  private locationAddedSubject = new Subject<void>();
  locationAdded$ = this.locationAddedSubject.asObservable();

  public courses: Course[] = [];
  public subjects: Subjects[] = [];
  public trainers: Trainer[] = [];
  public trainees: Trainee[] = [];
  public batches: Batch[] = [];

  form = new FormGroup({
    course_name: new FormControl('', Validators.required),
    course_fee: new FormControl('', Validators.required),
    course_duration: new FormControl('', Validators.required),
  });
  constructor(private restData: RestDataSource) {
    // this.restData.getSubject().subscribe({
    //   next: (data) => {
    //     this.subjects = data;
    //     console.log(data);
    //   },
    // });
    this.restData.getTrainees().subscribe({
      next: (data) => {
        this.trainees = data;
        console.log(data);
      },
    });

    this.restData.getTrainers().subscribe({
      next: (data) => {
        this.trainers = data;
        console.log(data);
      },
    });

    this.restData.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
        console.log(data);
      },
    });

    this.restData.getBatches().subscribe({
      next: (data) => {
        this.batches = data;
        console.log(data);
      },
    });
    this.restData.getCourses().subscribe((data) => {
      this.courses = data;
      console.log(data);
    });
    this.restData.getSubjects().subscribe({
      next: (data) => {
        this.subjects = data;
        console.log(data)
      }
    })
  }


  saveCourse() {
    if (this.form.valid) {
      const data = this.form.value;
      console.log(data);

      this.restData.saveCourse(data).subscribe(
        (savedCourses: Course[]) => {
          this.courses = savedCourses; // Update the courses list with the newly saved courses
          this.form.reset(); // Reset the form after successful save
        },
        (error) => {
          console.error('Error occurred while saving the course:', error);
          // Handle error if necessary
        }
      );
    }
  }
  deleteCourse(course_id: number | undefined): void {
    if (typeof course_id === 'number') {
      this.restData.deleteCourse(course_id).subscribe((data) => {
        console.log(data);

        Swal.fire({
          icon: 'success',
          title: 'Deleted Successfully',
          showConfirmButton: true,
          timer: 1500,
        }).then(() => {
          this.courses.splice(
            this.courses.findIndex((c) => c.course_id == course_id),
            1
          );
        });
      });
    }
  }
  // this.restData.deleteCourse(course_id).subscribe(data=>{
  //     console.log(course_id);

  //   })
  // }
  // updateCourse(course_id:any,course:Course){
  //   this.restData.updateCourse(course_id,course).subscribe(data=>{
  //     console.log(data);
  //   })
  // }
  getCourses(): Course[] {
    return this.courses;
  }

  getBatches(): Batch[] {
    return this.batches;
  }

  getSubjects(): Subjects[] {
    return this.subjects;
  }

  updateCourse(course_id: number, updatedCourse: Course): void {
    const index = this.courses.findIndex(
      (course) => course.course_id === course_id
    );
    if (index !== -1) {
      this.courses[index] = updatedCourse;
    }
  }

  //Trainer
  saveTrainer(trainer: Trainer) {
    this.restData.saveTrainer(trainer).subscribe({
      next: (data) => console.log(data),
    });
  }

  getTrainers(): Trainer[] {
    return this.trainers;
  }
  updateTrainerById(trainer_id: number, trainer: Trainer) {
    this.restData.updateTrainer(trainer_id, trainer).subscribe({
      next: (data) => console.log(data),
    });
  }

  deleteTrainerById(trainer_id: number) {
    this.restData.deleteTrainerById(trainer_id).subscribe();
  }

  //Trainee
  getTrainees(): Trainee[] {
    return this.trainees;
  }

  saveTrainee(trainee: Trainee) {
    this.restData.saveTrainee(trainee).subscribe({
      next: (data) => console.log(data),
    });
  }

  updateTraineeById(trainee_id: number, trainee: Trainee) {
    this.restData.updateTrainee(trainee_id, trainee).subscribe({
      next: (data) => console.log(data),
    });
  }

  deleteTraineeById(trainee_id: number) {
    this.restData.deleteTraineeById(trainee_id).subscribe();
  }
}
