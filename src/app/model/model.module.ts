import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";


import { RestDataSource } from "./restdatasource";
import { CourseRepository } from "./Repository/course.repository";
import { SubjectRepository } from "./Repository/subject.repository";
import { TrainerRepository } from "./Repository/trainer.repository";
import { BatchRepository } from "./Repository/batch.repository";
import { TopicsRepository } from "./Repository/topics.repository";


@NgModule({
    imports:[HttpClientModule],
    providers:[RestDataSource,CourseRepository,SubjectRepository,TrainerRepository,BatchRepository,TopicsRepository]
  })
  export class ModelModule{}
