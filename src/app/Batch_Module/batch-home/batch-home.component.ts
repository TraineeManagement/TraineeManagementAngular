import { BatchRepository } from './../../model/Repository/batch.repository';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-batch-home',
  templateUrl: './batch-home.component.html',
  styleUrls: ['./batch-home.component.css']
})
export class BatchHomeComponent implements OnInit {

  constructor(private routes:Router) { }


  ngOnInit(): void {
  }
  logOut(event:Event):void
  {
      this.routes.navigate(['/'])
  }

}
