import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  userData: any[] = [];
  localItem1: String | any;
  displayVal: any = [];
  data = [];
  constructor(private dataService: DataService) {
    this.localItem1 = localStorage.getItem('displayVal');
    if (this.localItem1 != null) {
      this.displayVal = JSON.parse(this.localItem1);
    }
  }

  ngOnInit(): void {
    this.userData.push(this.dataService.userData);
    for (let index = 0; index < this.userData.length; index++) {
      this.data = this.userData[index];
      if (this.data.length != 0) {
        this.displayVal.push(this.dataService.userData);
        localStorage.setItem('displayVal', JSON.stringify(this.displayVal));
      }
    }
  }
}
