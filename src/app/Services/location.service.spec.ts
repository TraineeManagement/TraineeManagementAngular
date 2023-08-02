/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LocationService } from './location.service';

describe('Service: Location', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationService]
    });
  });

  it('should ...', inject([LocationService], (service: LocationService) => {
    expect(service).toBeTruthy();
  }));
});




// import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
// import {
//   FormBuilder,
//   FormControl,
//   FormGroup,
//   NgForm,
//   Validators,
// } from '@angular/forms';
// import { Router } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { SubjectRepository } from 'src/app/model/Repository/subject.repository';
// import { TopicsRepository } from 'src/app/model/Repository/topics.repository';
// import { TrainerRepository } from 'src/app/model/Repository/trainer.repository';
// import { RestDataSource } from 'src/app/model/restdatasource';
// import { Subjects } from 'src/app/model/subject';
// import { Topic } from 'src/app/model/topic';
// import { Trainer } from 'src/app/model/trainer';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-subject',
//   templateUrl: './subject.component.html',
//   styleUrls: ['./subject.component.css'],
// })
// export class SubjectComponent implements OnInit, OnDestroy {
//   isLoading = true;
//   constructor(
//     private formBuilder: FormBuilder,
//     private trainerRepository: TrainerRepository,
//     private subjectRepository: SubjectRepository,
//     private restDatasource: RestDataSource,
//     private topicsRespository: TopicsRepository,
//     private router: Router
//   ) {}

//   show: boolean = false;
//   icon: boolean = true;
//   select: boolean = false;
//   cl: boolean = true;
//   public trainer!: Trainer[];
//   public sub!: Subjects[];
//   public topics: Topic[] = [];
//   public subject: Subjects = new Subjects();
//   public topic: Topic = new Topic();
//   loginForm!: FormGroup;
//   @ViewChild('topicForm') topicForm!: NgForm;
//   public subjects: Subjects[] = [];
//   private topicsUpdateSubscription: Subscription | undefined;

//   ngOnInit(): void {
//     this.loginForm = this.formBuilder.group({
//       subject_name: ['', Validators.required],
//     });

//     this.getSubject();

//     // Subscribe to the subjectsUpdated Subject to keep the subjects data updated
//     this.restDatasource.getSubjectUpdateListener().subscribe((subjects) => {
//       this.subjects = subjects;
//     });

//     // Subscribe to the topicsUpdated Subject to keep the topics data updated
//     this.restDatasource.getTopicsUpdateListener().subscribe((topics) => {
//       this.topics = topics;
//     });

//     // Fetch initial topics data
//     // this.restDatasource.getTopics().subscribe();
//   }

//   ngOnDestroy(): void {
//     // Unsubscribe from the topics update subscription to avoid memory leaks
//     if (this.topicsUpdateSubscription) {
//       this.topicsUpdateSubscription.unsubscribe();
//     }
//   }
//   getTopic(subject_Id: number): Topic[] {
//     return this.topics.filter((data) => data.subject_Id === subject_Id);
//   }

//   saveSubject() {
//     if (this.loginForm.valid) {
//       const data = this.loginForm.value;
//       this.restDatasource.addSubject(data).subscribe(() => {
//         Swal.fire({
//           icon: 'success',
//           title: 'Subject Added Successfully',
//           showConfirmButton: false,
//           timer: 1500,
//         }).then(() => {
//           this.show = false;
//         });
//       });
//     }
//   }

//   getSubject() {
//     this.restDatasource.getSubjects().subscribe((data) => {
//       this.subjects = data;
//       this.isLoading = false;
//     });
//   }

//   delete(subjectId: any) {
//     if (typeof subjectId === 'number') {
//       this.restDatasource.deleteSubject(subjectId).subscribe(
//         (data) => {
//           Swal.fire({
//             icon: 'success',
//             title: 'Deleted Successfully',
//             showConfirmButton: false,
//             timer: 1500,
//           }).then(() => {
//             this.getSubject(); // Fetch and filter the branches again
//           });
//         },
//         (error) => {
//           console.error('Error occurred while deleting the branch:', error);
//           Swal.fire({
//             icon: 'error',
//             title: 'Error',
//             text: 'An error occurred while deleting the branch.',
//           });
//         }
//       );
//     }
//   }

//   hide() {
//     this.show = !this.show;
//   }

//   onTrainerSelection(event: any) {
//     this.topic.subject_Id = event.value;
//   }
//   iconMap: { [subjectId: number]: boolean } = {};
//   view(subject_Id: number) {
//     this.iconMap[subject_Id] = !this.iconMap[subject_Id];
//     this.icon = !this.icon;
//   }

//   sel() {
//     this.select = !this.select;
//   }

//   saveTopic() {
//     // Ensure a subject is selected
//     if (this.topic.subject_Id) {
//       this.restDatasource.saveTopic(this.topic).subscribe((newTopic) => {
//         Swal.fire({
//           icon: 'success',
//           title: 'Batch Added Successfully',
//           showConfirmButton: false,
//           timer: 1500,
//         }).then(() => {
//           this.cl = true;

//           // Reset the form and form validation
//           this.topicForm.resetForm();

//           // Reset the topic object to prepare for a new entry
//           this.topic = new Topic();
//         });
//       });
//     } else {
//       // If no subject is selected, show an error message
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Please select a subject for the topic.',
//       });
//     }
//   }

//   top() {
//     this.cl = !this.cl;
//   }
// }

