import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SubjectRepository } from 'src/app/model/Repository/subject.repository';
import { TopicsRepository } from 'src/app/model/Repository/topics.repository';
import { TrainerRepository } from 'src/app/model/Repository/trainer.repository';
import { RestDataSource } from 'src/app/model/restdatasource';
import { Subjects } from 'src/app/model/subject';
import { Topic } from 'src/app/model/topic';
import { Trainer } from 'src/app/model/trainer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
})
export class SubjectComponent implements OnInit {
  isLoading = true;
  constructor(
    private formBuilder: FormBuilder,
    private trainerRepository: TrainerRepository,
    private subjectRepository: SubjectRepository,
    private restDatasource: RestDataSource,
    private topicsRespository: TopicsRepository,
    private router: Router
  ) {}

  show: boolean = false;
  icon: boolean = true;
  select: boolean = false;
  cl: boolean = true;
  public trainer!: Trainer[];
  public sub!: Subjects[];
  public topics: Topic[] = [];
  public subject: Subjects = new Subjects();
  public topic: Topic = new Topic();
  loginForm!: FormGroup;
  public subjects: Subjects[] = [];

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      subject_name: ['', Validators.required],
    });

    this.getSubject();
    this.restDatasource.getTopics().subscribe((topics) => {
      this.topics = topics;
    });

    // Subscribe to the subjectsUpdated Subject to keep the subjects data updated
    this.restDatasource.getSubjectUpdateListener().subscribe((subjects) => {
      this.subjects = subjects;
    });
    this.getSubject();
  }

  public getTrainer() {
    console.log(this.trainerRepository.getTrainer());
    return this.trainerRepository.getTrainer();
  }
  form = new FormGroup({
    subject_name: new FormControl('', Validators.required),
  });

  onTrainerSelection(event: any) {
    this.topic.subject_Id = event.value;

    console.log('hii');
    console.log(event.value);
  }

  // saveSubject() {
  //   console.log(this.subject);
  //   //  location.reload()
  //   return this.subjectRepository.saveSubject(this.subject);
  // }
  saveSubject() {
    console.log(this.subject);
    //  location.reload()
    //  return this.subjectRepository.saveSubject(this.subject)
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      console.log(data);
      this.restDatasource.addSubject(data).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Subject Added Successfully',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.show = false;
        });
      });
    }
  }

  getSubject() {
    this.restDatasource.getSubjects().subscribe((data) => {
      this.subjects = data;
      console.log(this.subjects);
      this.isLoading = false;
    });
  }
  // getCourses() {
  //   this.restdata.getCourses().subscribe((data) => {
  //     this.courses = data;
  //     console.log(this.courses);
  //   });
  // }

  delete(subjectId: any) {
    if (typeof subjectId === 'number') {
      this.restDatasource.deleteSubject(subjectId).subscribe(
        (data) => {
          console.log(data);

          Swal.fire({
            icon: 'success',
            title: 'Deleted Successfully',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.getSubject(); // Fetch and filter the branches again
          });
        },
        (error) => {
          console.error('Error occurred while deleting the branch:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while deleting the branch.',
          });
        }
      );
    }
  }

  hide() {
    if (this.show == false) {
      this.show = true;
    } else {
      this.show = false;
    }
  }
  getTopic(subject_Id: any) {
    console.log(subject_Id);
    console.log(this.topicsRespository.getTopics());
    var topic: Topic[] = this.topicsRespository
      .getTopics()
      .filter((data) => data.subject_Id == subject_Id);
    console.log(topic);
    return topic;
  }

  iconMap: { [subjectId: number]: boolean } = {};

  view(subject_Id: number) {
    this.iconMap[subject_Id] = !this.iconMap[subject_Id];
    if (this.icon == true) {
      this.icon = false;
    } else {
      this.icon = true;
    }
  }

  sel() {
    if (this.select == false) {
      this.select = true;
    } else {
      this.select = false;
    }
  }

  // saveTopic() {
  //   console.log(this.topic);
  //   this.restDatasource.saveTopic(this.topic).subscribe(() => {
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Batch Added Successfully',
  //       showConfirmButton: false,
  //       timer: 1500,
  //     }).then(() => {
  //       this.cl = true;
  //     });
  //   });

  //   // return this.topicsRespository.saveTopic(this.topic);
  // }

  saveTopic() {
    console.log(this.topic);
    this.restDatasource.saveTopic(this.topic).subscribe((newTopic) => {
      Swal.fire({
        icon: 'success',
        title: 'Topic Added Successfully',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        this.cl = true;
        // Add the new topic to the local array
        this.topics.push(newTopic);
      });
    });
  }

  top() {
    if (this.cl == true) {
      this.cl = false;
    } else {
      this.cl = true;
    }
  }
}
