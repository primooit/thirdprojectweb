import { SharedService } from './../../services/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  shared: SharedService;
  constructor() {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
  }

}
