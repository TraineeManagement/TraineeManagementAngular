import { Subjects } from './../subject';
import { Injectable } from "@angular/core";


import { RestDataSource } from "../restdatasource";
@Injectable()
export class SubjectRepository{
constructor(private restDatasource:RestDataSource){
//   this.restDatasource.getSubject().subscribe(data=>
//     {this.subjects=data
//     },error=>
//     console.log(error)
// )



}
// public subject:Subjects[]=[];
public subjects:Subjects[]=[];

// saveSubject(subject:Subjects){
//     console.log(subject)
//     console.log("method called")
//    return this.restDatasource.saveSubject(subject).subscribe(data=>{

//     console.log(data)
//    },error=>console.log(error)
//    )
// }
getsubjects(){

return this.subjects;

}
deletesubject(subjectId:any){
  this.restDatasource.deleteSubject(subjectId).subscribe(data=>{
      console.log(subjectId)
  })
}
}
