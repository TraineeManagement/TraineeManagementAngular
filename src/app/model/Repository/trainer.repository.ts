import { Injectable } from "@angular/core";

import { Trainer } from "../trainer";
import { RestDataSource } from "../restdatasource";

@Injectable()
export class TrainerRepository{
public trainer:Trainer[]=[]
constructor(private restDatasource:RestDataSource){
    this.restDatasource.getTrainers().subscribe(data=>{
        this.trainer=data
        console.log(data)
    },error=>console.log(error))
}
getTrainer(){
  return  this.trainer
}
}
