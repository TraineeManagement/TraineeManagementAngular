
import { RestDataSource } from './../restdatasource';
import { Injectable, OnInit } from '@angular/core';
import { Course } from '../course';
import { Batch } from 'src/app/model/batch';
import { Subjects } from '../subject';
import { Branch } from '../branch';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Injectable()
export class BatchRepository implements OnInit
{
  public login:boolean=true;
  public app:boolean=false;

 public batches:Batch[]=[];
 public courses:Course[]=[];
 public branches:Branch[]=[];
 form = new FormGroup({
  batch_name: new FormControl('', Validators.required),
  course: new FormControl('', Validators.required),
  branch: new FormControl('', Validators.required)
});

  constructor(private restData:RestDataSource,private router: Router)
  {
    // this.restData.getBatches().subscribe(data=>
    //   {
    //     this.batches=data;
    //     console.log(data)
    //   },error=>
    //   console.log(error)

    //   )

    this.restData.getCourses().subscribe(data=>
      {
        this.courses=data;
        console.log(data)
      },error=>
      console.log(error)

      )
    }
  ngOnInit(): void {
    this.getBatches()
  }




  addBatch() {
    if (this.form.valid) {
      const data = this.form.value;
      console.log(data)
      this.restData.addBatch(data).subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
  goBack() {
    this.router.navigate(['']);
  }

  getBatches():void
  {
    // console.log(this.batches)
  //  return this.batches;
  this.restData.getBatches().subscribe((data)=>(this.batches=data))
  console.log(this.batches)

  }
   getCourses(){
    console.log(this,this.courses)
    return this.courses;
  }
      deleteBatch(batch_id: number){
        this.restData.deleteBatch(batch_id).subscribe(data=>{

            console.log(batch_id);

        })
      }

     getBranches() {
      this.restData.getBranches().subscribe(
        (branches: Branch[]) => {
          this.branches = branches;
          console.log("branches",this.branches)
        },
        (error: any) => {
          console.log(error);
        }
      );
    }


     }






