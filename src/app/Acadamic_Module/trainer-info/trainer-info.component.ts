import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Trainer } from 'src/app/model/trainer';

@Component({
  selector: 'app-trainer-info',
  templateUrl: './trainer-info.component.html',
  styleUrls: ['./trainer-info.component.css'],
})
export class TrainerInfoComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  trainers!: Trainer[];
  routeData!: any;
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (data) => (this.routeData = window.history.state)
    );
    this.trainers = this.routeData.trainers;
  }
}
