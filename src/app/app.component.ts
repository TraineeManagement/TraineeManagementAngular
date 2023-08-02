import { AppServiceService } from './Admin_Module/login/app-service.service';
import { BatchRepository } from 'src/app/model/Repository/batch.repository';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TraineeMangement';
  constructor(private batchrepositary:BatchRepository,public appServiceService:AppServiceService){}

}
