import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent {
  constructor(private app: AppComponent) {
    app.hello1();
  }
}
